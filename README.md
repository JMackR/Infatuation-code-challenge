## INSTALLATION INSTRUCTIONS

### Environment setup

- Node.js >= 16.14.x
- yarn >= 1.22.5
- homebrew >= 3.1.8
- Xcode >=12
- Docker - latest version

Once repo is cloned locally, all you will need to do is run the yarn cmd in your terminal
There is a postInstall script to install all your dependencis, deploy both the ios simulator and the docker server with golang. Just sit back, relax and leave the flying to us. HA!

## TECH STACK

Latest version of the React-Native install template using typescript

- **React-Navigation** for navigation
- **React-Native-svg-transformer:** has been implemented in order to use SVG's vs JPG or PNG's. Helps keep the bundle size down and scales much better across different devices.
- **Lodash** to help with the Text-Entry debouncing
- **node's FETCH** for api calls
- **JEST** for unit and integration testing

## PROJECT REQUIREMENTS

- **Overall Goal:** Connect to Github api search for your favorite repos and be able to save up to 10 repos to the server housed in docker.
- **Features:**
  - Display a list of repos based on the users input.
    - the default page size is 30 per page.
    - No current requirements for infinite scrolling or pagination.
  - Pressing a row item will save the Repo to the Docker server hosted at localhost:8080/repo/
  - **_Added Favorite Icon to display favorited Searched items_**
  - **_Favorited Items will persist on the Search screen with any search params_**
  - Bottom Navigation Tabs added to allow user to view Search and Favorites screens
  - Empty and Error states display messages
  - Attempting to select more than 10 favorites are prevented, user is prompted with error message
  - Input Clear button added to clear search items
  - Search button added to focus input field
  - Favorite screen Search button will Navigate user back to search screen if no favorites have been added
  - UI uses a minimalistic design scheme... black and white baby!!!! Keepin it simple.
  - Favorites screen has ability to sort by stars incrementally and decrementally
  - Favorites can be removed from Favorites list by Swipping card to the left and pressing the trash can
  - Unit testing has been implemented using JEST
  - You can view the coverage chart in your browser by clicking on the index.html file in the coverage folder

  
  ## GITHUB API LIMITATIONS ##
  In order to prevent api calls being limited you can create a personal access token from your personal github account developer settings and choose the classic option.
  Copy your token and paste it in the useSearch Hook Token const.

  
