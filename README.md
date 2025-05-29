# Hanabi-plus
Hanabi-plus is a collection of projects surrounding Hanabi, a a multiplayer cooperative card game where the objective is to play cards in a correct order by color. The interesting part is that you can see everyone's hand but yours and the only way to get more information is if someone gives you a hint. This is called a game of imperfect information, so players are making decisions without knowing everything about the game board, similar to poker (here though players knows only their hand but cannot see other player's hands).

## hanabi: Hanabi Game Engine (C++)
The main part of this project is a library that handles the basic game logic, though it's possible to adjust it to play with custom rules and play around with the distribution of cards per suit, as an example. 

### Hanabi Rules


The classical configuration with: 
- 5 colors (Suits):
- 50 cards with the next distribution:
  Three 1s, two 2s, two 3s, two 4s, one 5s per color.
- 8 Hint tokens
- 3 fuse tokens

So a player has three options on their turn:
- **Give a hint** - Spend a hint token to tell another player a selected cards color or number.
- **Play a card** - You pick a card to play.
  -  If it turns out to be a card that can be placed, then it will be placed on the appropriate suit and the team gains 1 point.
  - If the placed card is a 5 (last card to complete a color stack), then you regain a hint token as a bonus.
  - If the chosen card is revealed to not be playable at the time, it will be discarded and a fuse token is lost. 
- **Discard a card** - You can discard a card to regain a hint token.

The game ends when:
- All color stacks are completed.
- All fuse tokens have been lost.
- Players run out of cards to draw.

Total points you can accumulate is 25 and that happens when all 5 stacks are filled with no mistakes made.

You can view the original game rules here for reference:
https://rnrgames.com/Content/RRGames/images/ProductRules/hanabiRules.pdf

## server: Concurrent Multiplayer TCP Server (C++ with Boost.Asio)
To enable real-time multiplayer gameplay, the project includes a TCP server implemented in C++ using the Boost.Asio networking library. The server supports concurrent client connections and handles all aspects of communication, game session management, and synchronization between players. This component allows multiple users to play Hanabi together over a network, with the server coordinating the game state and player actions.

One of my goals was to learn a bit of networking and this was a good way to learn how to design server functionality and handle connections using asynchronous methods. I'm using Boost.Asio library to achieve the server functionality:
https://www.boost.org/doc/libs/latest/doc/html/boost_asio.html

## hanabi-py: Python Module for Hanabi (pybind11)
The C++ Hanabi engine is exposed to Python through a set of bindings created using pybind11. This Python module allows developers to interact with the game logic directly from Python, enabling rapid prototyping, scripting, and testing. 

## hanabi-simulator: Reinforcement Learning and Simulation Framework (Python + MAVA)
Built on top of the Python bindings, this part of the project provides a framework for training and evaluating AI agents using reinforcement learning. It integrates with MAVA (Multi-Agent Value-Based Reinforcement Learning) to support the development of agents that can learn to play Hanabi cooperatively. The framework includes tools for running simulations, configuring training environments, and analyzing agent performance, making it ideal for research in multi-agent systems and collaborative AI.