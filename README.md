This is a burger builder app, built using React.

The entire components in the web page are divided into assets, dumb/stateless components ,stateful containers and higher order components.

The assets contains: 
    1.Images

The components in the burger builder app are:
    1.Burger
          i. Build controls
              I. Build Control (for each ingredient)
          ii. Burger Ingredients
          iii. Order Summary
    2.Logo
    3.Navigation
          i.NavigationItems
              I.Navigation item(for each nav)
          ii.Side Drawer
              I.Drawer toggle
          iii.Tool bar
    4.UI
          i. Backdrop
          ii. Button
          iii. Modal

The containers in the burger builder app are:
    1. Burger builder : Maintains state properties like 
            ingredients, 
            total price, 
            is the item purchasable or not, 
            is the burger is in purchasing mode or not. 
      The state methods are 
            updating the purchasing state, 
            adding the ingredient, 
            removing the ingredient, 
            purchase handler, 
            purchase cancel handler, 
            purchase continue handler.

The higher order components are:
  1. Layout: Maintains state properties like
                show side drawer or not
            methods like
                side drawer toggle handler
                side drawer closed handler

  2. Aux: To wrap all the components in a div, whereever necessary

The app uses ```firebase``` for storing the orders, customer info in the database. 
Also, the app uses `firebase` authentication Rest API for user signin and signup.

To run the app in development mode:
    1. Clone the github to your local directory
    2. run
    ```npm start```

Open 
```http://localhost:3000```
to view it in the browser.

The app is also hosted in `firebase`. The hosting URL is : 
```https://react-burger-builder-81094.web.app```
