This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# KeepingCents

## Purpose

KeepingCents is a simple single page application that serves as a monthly budget tracker. The application will allow users to
sign-up and sign-in, including using their google accounts. KeepingCents will also store previous month entries along with the
current month, allowing users to retrieve older budget records and edit them if necessary. 

This project is to practice state management through the use of React's hooks instead of a state management tool like Redux,
since the overall application's state that needs to be maintained is relatively minimal/simple. Which provides a perfect
opportunity to practice implementing hooks as a form of state management.

## Progress Reports

### 09/01/2020

##### Changes/Implementations

1. Began to implement Firestore functionality

2. User sign-in/sign-up authorization implemented and stored with Auth Context

3. Date Context created and implemented

4. Initial Data Entry implemented for Firestore in controller component.

5. Finished Page Design and Layout

##### Upcoming To-Do List

1. Finish implementing Firestore functionality for budget controller component.

2. Create Data Context to retrieve and detect changes of data entries

3. Continue to implement feature functionality as the required data becomes available.


### 08/05/2020

##### Changes/Implementations

1. Finished implementing and basic styling the homepage components, including: table-title, table-entry, previous-month-entry components.

2. Re-designed the budget-controller with the creation and implementation of toggle switches to indicate the data type entry.
Looks a lot better while maintaining easy and intuitive functionality.

3. Made minor changes to the submit icon of budget controller to change background and fill color when hovered.


##### Upcoming To-Do List

1. Create an initial State object to finish mapping props and ensuring all components that receive props are working as intended.

2. Implement YTD-Budget display for Header

2. Create better notes for components and their styling sheets so that others can easily tell what is
going on.

3. Combine the dashboard-expense and dashboard-income display components as they violate the DRY principle and are also
styled exactly the same with only a few minor differences. Thus, a perfect candidate to rework into a reusable component.

4. Much like the dashboard displays, the income and expenses tables can most likely be combined as well. Particularly since
a simple ternary operator can be implemented to check the type of the incoming props to render in the correct place.

5. Clean and organize the Sass variables file.

### 08/01/2020

**Currently building out static version of application**

##### Changes/Implementations

1. Homepage created and styled, most of the overlaying container components also created and mostly styled.

2. Sign-in and Sign-up components and signin page created and styled. Functionality yet to be implemented.

3. Header component mostly done, missing Year-to-Date display, will be implemented at later date.

4. Dashboard and subcomponents created and styled. Some changes will be made in the future, particularly the
budget controller.


##### Upcoming To-Do List

1. Finish creating and styling the rest of the application's homepage.

2. Implement better notes for components and their styling sheets so that others can easily tell what is
going on.

3. Combine the dashboard-expense and dashboard-income display components as they violate the DRY principle and are also
styled exactly the same with only a few minor differences. Thus, a perfect candidate to rework into a reusable component.

4. Much like the dashboard displays, the income and expenses tables can most likely be combined as well. Particularly since
a simple ternary operator can be implemented to check the type of the incoming props to render in the correct place.

5. Finish planning out where State needs to live within the application. Most components are simple functional ones, so
it should not be hard to figure out the best place to place State.

6. Clean and organize the Sass variables file.