//
// Created by annie on 5/23/2025.
//

#include "game.h"
#include <iostream>
#include <random>
#include <algorithm>
#include <chrono>

int f(int x){
    return x+1000;
}

template<typename T>
std::vector<T> extract_slice(std::vector<T> &vec, size_t i, size_t j) {
    if (i > vec.size() || j > vec.size() || i > j) {
        throw std::out_of_range("Invalid slice (subvector) indices");
    }
    vec.erase(vec.begin() + i, vec.begin() + j);
    return std::vector<T>(vec.begin() + i, vec.begin() + j);
}

namespace hanabi {
    Game::Game(const Settings &settings): settings(settings) {

        for (int i = 0; i < settings.numberOfSuits; i++) {
            suitStack[i] = Card(i,0);
        }
        std::vector<std::pair<int, int>> deck;

        int n = settings.rankDistr.size();

        for (int i = 1; i <= settings.numberOfSuits; i++) {
            for (int j = 1; j <= n; j++) {
                for (int k = 0; k < settings.rankDistr[j-1]; k++) {
                    deck.push_back({i, j});
                }
            }
        }
        static std::random_device rd;
        static std::mt19937 rng(rd());
        std::ranges::shuffle(deck, rng);

        for (int i = 0; i < settings.numPlayers; i++) {
            //Initialize Player hands
            Player player = Player(i, "Player");
            for (int j = 0; j < settings.cardsPerHand; j++) {
                (*player.hand)[j] = Card(deck.back());
                deck.pop_back();
            }
            players->push_back(player);
        }
        for (int i=0;i<deck.size(); i++) {
            drawPile->push(Card(deck.back()));
        }
        clues = settings.initialClues;
        fuses = settings.initialFuses;
    }

    void Game::Start() {
        std::cout << "Starting Hanabi Game!" << std::endl;
        nextTurn();
    }

    void Game::PlayCard(int i, int j) {
        if (TurnValidity(i)) {
            Player& player = (*players)[i];
            Card& card = (*player.hand)[j];

            if (suitStack[card.suit].rank == card.rank - 1) {
                std::cout <<"☆ -> PlayerID="<<player.id <<" played " <<card<< std::endl;
                updateScore();
                Card old_stack_card = suitStack[card.suit];
                suitStack[card.suit] = card; //update Stack
                std::cout << "Updated stack"<<old_stack_card<<" -> " << card << std::endl;
                DrawAndReplaceCard(card);

            }
            else {
                std::cout <<"X -> PlayerID="<< player.id <<" played " << card<< std::endl;
                fuses--;
                std::cout <<"you are down to :" <<fuses<< " fuses" <<std::endl;
            }
        nextTurn();
        }
    }
    void Game::DrawAndReplaceCard(Card& card) const {
        const Card new_card = drawPile->top(); // Draw a new card
        drawPile->pop();
        card = new_card;
    }


    void Game::DiscardCard(int i, int j) {
        if (TurnValidity(i)) {
            Player& player = (*players)[i];
            Card& card = (*player.hand)[j];
            discardPile->push(card); // Put card in discard pile

            std::cout <<"PlayerID="<<player.id <<" discarded " << card<< std::endl;
            nextTurn();
        }
    }
    //Player_i giving hint to Player_j about Player_j's k'th card.
    void Game::GiveHint(int i, int j, int k, HintType hintType) {
        if (TurnValidity(i)) {
            if (hintType == HintType::SuitHint) {
                std::cout << "Player" << i << " revealed to player " << j << " the suit of card_" << k << "is" << (*(*players)[j].hand)[k].suit << std::endl;
                //This should really be done on the server/session side
            }
            if (hintType == HintType::RankHint) {
            }
            nextTurn();
        }
    }

    bool Game::TurnValidity(int i) const {
        if (turn % (i + 1) != 0) {
            std::cout << "Not your turn Player_"<<i<<"!" << std::endl;
            return false;
        }
        return true;
    }
    void Game::nextTurn() {
        turn++;
        int j = turn % settings.numPlayers;
        std::cout <<"Starting turn="<<turn <<" -------> Waiting for Player"<<(*players)[j].id<<"." <<std::endl;
    }
    void Game::updateScore() {
        score ++;
        std::cout << "Updated score: " << score << std::endl;
    }

//PRINT FUNCTIONS----------------------------------------------------------------------
    std::ostream &operator<<(std::ostream &os, const Card &card) {
        os << "[Suit: " << card.suit << " Rank: " << card.rank <<"]";
        return os;

    };
    std::ostream &operator<<(std::ostream &os, const Player &player) {
        std::cout << std::setfill('-') << std::setw(30) << "" << "\n";
        os << "Player=" << player.id << " PlayerName=" << player.name << std::endl;
        std::cout << std::setfill('-') << std::setw(30) << "" << "\n";
        int n = player.hand->size();
        for (int i=0;i<n;i++) {
            os <<"i="<<i<<"\t "<< player.hand->at(i) << std::endl;
        }
        return os;
    };

    std::ostream &operator<<(std::ostream &os, const Game &game) {
        os << "Game State:\n";

        os << "Number of Players:"<<std::to_string(game.players->size())<<"\n";
        for (size_t i = 0; i < game.players->size(); i++) {
            os << (*game.players)[i];
        }
        os << "Suit Stack:\n";
        for (const auto &[key, value]: game.suitStack) {
            os << "  " << key << ": " << value << "\n";
        }
        os << "Clues: " << game.clues << "\n";
        os << "Fuses: " << game.fuses << "\n";
        os << "Score: " << game.score << "\n";
        os << "Turn: " << game.turn << "\n";

        return os;
    }

} // hanabi
