![](https://i.imgur.com/yF7crw6.jpg)

## _Cards that give recognition of the fact that all life is interrelated_

Agape is a cross-platform icebreaker mobile application. It has the ability to view unique decks of endless questions which is the perfect app to pull out during icebreaker sessions, after-dinner games or any instances where you want to have a deeper or more intensified conversation with family, friends, or with a significant other near or far.

## Overview

In this application, one is able to view and edit 13 pre-made decks pertaining to the topics of travel, childhood memories, interesting experiences, everyday life, family relationships, friendships, personality, college & career, philosophy, community involvement, theology & doctrine, personal faith, and local church. Besides these pre-made categories is the ability to customise one’s own desired deck of cards.

## Agape Example

### Usage

![](https://i.imgur.com/ryrkGvU.gif)

### Code

![](https://i.imgur.com/bBXiIKJ.jpg)

## Design Patterns

### Controlled Component Design Pattern

Controlled Components are used all throughout the create and edit screens. It is a pattern in React Native that is commonly used to handle form state. This design pattern works by utilizing states via props. State changes are performed through callbacks; for instance, via an onChangeText or updateState. Values can be modified by having it passed to controlled components as props.

The code snippet below indicates the usage of the controlled component design pattern:
![](https://i.imgur.com/coPSNU6.jpg)

As seen above, the values of the following input fields are modified through the use of the controlled component design pattern. It uses the callbacks such as onChangeText which a value prop is used to update a useState.

## Features

-   View pre-made decks filled with question cards
-   Create, edit and delete decks
-   Create, edit and delete edit cards
-   Swipe through multiple question cards
-   View a list of favorited cards
-   View a list of cumulative cards

## Project Files Description

-   HomeScreen.js - A screen which displays a list of selectable decks and a card that links to making a custom deck. Holding down the deck card will navigate to the edit deck screen.
-   FavoriteScreen.js - A screen which displays a list of favourite cards.
-   CardsScreen.js - A screen which displays a list of all the cards.
-   CardScreen.js - A screen which displays the deck of swipepable question cards and a button to add more cards. Each card holds the deck title, the question, the tags, and a heart that puts the card in the favourites list.
-   CreateCardScreen.js - A screen for creating a single card in a deck. Consists of fields for the card question, card tags, and a create button.
-   CreateDeckScreen.js - A screen for creating a custom deck. Consists of fields for the deck title, deck tags, and a create button.
-   EditCardScreen.js - A screen for editing a single card in a deck. Consists of pre-filled fields for the card question, card tags, and an edit button.
-   EditDeckScreen.js - A screen for editing a single custom deck. Consists of pre-filled fields for the deck title, deck tags, and an edit button.
-   Tabs.js - Handles the creation of the tabbed navigation bar at the bottom of the screens. This allows for switching between various routes or screens. Different routes consist of the Home screen, Cards list screen and the Favourite Cards List screen.
-   StackNavigator.js - Each tab consists of its own stack of screens. The stack of screens for the Home Screen are responsible for displaying the Home, the screens for creating and editing screens for a Deck and Card.
-   Reloader.js - Reloads or refreshes the whole application
-   Config.js - Holds the configurations for firebase firestore database

## Tech

Agape uses a number of open source projects to work properly:

-   [React Native JS](https://reactnative.dev/) - Javascript framework to build natively rendering Android and IOS mobile application
-   [Expo](https://docs.expo.dev/) - React Native framework and platform for native applications
-   [Node.js](https://nodejs.org/en/) - evented I/O for the backend
-   [Firebase](https://firebase.google.com/) - NoSQL database for Agape application data (decks, questions)
-   [Prettier](https://prettier.io/) - Code formatting tool

## Installation

Agape requires [Node.js](https://nodejs.org/) v16+ to run.

NPM must be installed with node.

Windows, Mac, Linux OS

Expo-cli installation via command (requires NPM and node to be installed)

```
npm install -g expo-cli
```

Install the dependencies and start the server.

```sh
cd agapeApp
npm i
npm run start
```

### Running Agape with Expo-CLI

Clone Agape git repository to computer.

Open command line terminal and open to location that holds Agape's App.js.

Install expo package

```
npm install expo
```

Install all required packages

```
expo install
```

Run app through expo

```
expo start
```

Agape is now capable to run on an emulator or on a mobile device.

### Building application

In order to build a standalone application please see [here](https://docs.expo.dev/classic/building-standalone-apps/).

## Learn More

To learn more about React Native, take a look at the following resources:

-   [React Native Documentation](https://reactnative.dev/) - learn about React Native features and API.

You can check out the [React Native GitHub repository](https://github.com/facebook/react-native) - your feedback and contributions are welcome!

## Copyright information

Agape is created and maintained by MacchiatoDev.

MacchiatoDev is open to suggestions, feel free to message MacchiatoDev on Discord or open an issue.

## Bug list

-   When swipping cards the user must swipe just below the question title.
-   Unique key warning appear in the Home and Cards screen still appear even when they are already unique.
-   On Android, when navigating screens through the tabs, it would sometimes show a blank screen.
