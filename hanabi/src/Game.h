//
// Created by annie on 5/23/2025.
//

#ifndef GAME_H
#define GAME_H
#include <unordered_map>
#include <iostream>
#include <vector>
#include <memory>
#include <stack>

namespace hanabi {

    struct Card {
        int suit;
        int rank;
        Card() : suit(-1), rank(-1) {}
        Card(int s, int r) : suit(s), rank(r){};
        explicit Card(const std::pair<int, int> &c):suit(c.first),rank(c.second){}
    };

    struct Player {
        int id;
        std::string name;
        std::shared_ptr<std::unordered_map<int, Card> > hand;

        Player(const int id_, const std::string &name_)
            : id(id_), name(name_), hand(std::make_shared<std::unordered_map<int, Card> >()) {
        }
    };

    struct Settings {
        int numPlayers;
        int cardsPerHand;
        int numberOfSuits;
        int initialClues;
        int initialFuses;
        const std::vector<int> &rankDistr;
    };

    enum class HintType : int {
        SuitHint,
        RankHint
    };

    class Game {
    public:
        std::shared_ptr<std::stack<Card> > drawPile = std::make_shared<std::stack<Card>>();;
        std::shared_ptr<std::stack<Card> > discardPile = std::make_shared<std::stack<Card>>();
        std::shared_ptr<std::vector<Player>> players = std::make_shared<std::vector<Player>>();
        std::unordered_map<int, Card> suitStack; // <suit, top_most_card>
        Settings settings;
        int clues;
        int fuses;
        int score = 0;
        int turn = 0;


        void PlayCard(int i, int j);

        void DiscardCard(int i, int j);

        void GiveHint(int i, int j, int k, HintType hintType);

        explicit Game(const Settings &settings);

    private:
        void nextTurn();
        void updateScore();
        void DrawAndReplaceCard(Card& card) const;
        bool TurnValidity(int i) const;
    };

    std::ostream &operator<<(std::ostream &os, const Card &card);

    std::ostream &operator<<(std::ostream &os, const Player &player);

    std::ostream &operator<<(std::ostream &os, const Game &game);
} // hanabi

#endif //GAME_H
