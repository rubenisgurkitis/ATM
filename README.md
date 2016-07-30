ATM Single Page Application
====

This app is part of a selection process
---

####Requisites to run the app
To install all dependencies you will need to have installed *npm*. First, you will need to install *Node.js* and after that, run the following command to ensure that you are using an updated version of *npm*
```
sudo npm install npm -g
```

####How to run the app

Checkout this repo
```
	> git clone https://github.com/rubenisgurkitis/ATM
```
Browse to the root folder
```
> cd atm
```
Install dependencies
```
> npm install
```
Start the building process
```
> npm start
```
Open your favorite browser on: http://localhost:8080

####Comments
######Ideas left
There was certain things I wanted to do but I couldn't because of the time limit:
* Fine tune loading animation, so the content is not visible till the new component is loaded. This is impossible right now since the loading component gets destroyed and created in the new component. I should find a different kind of animation or change the architecture.
* Create a component with the three buttons (accept, clear and back) and reuse the component through Pin code screen and money selection screen.
* Set the message in the **Take card** screen by a prop or state, so it doesn't say take your card and your money when no money is withdrawn.
* Better use of inheritance, there's a lot of boiler plate code in the components (create singleton, bind this to handlers, stop loading, etc). I'd like to create my own super component so all the components can extend from it and avoid all that code.
* Drag and drop for card. I found funny the idea but I hadn't time to implement it.
* Testing!

######Technology decisions
* I decided to use React since it's my favorite JS framework in the market right now. Moreover, seeing the requirements (SPA) it seemed to be one of the best decisions.
* **Why I used a Singleton?** My first idea was to use Reflux (a simple implementation of Flux) but then I figured out that Reflux is still not supporting ES6 (the code for supporting ES6 is in GitHub but still not in **npm**). After that, I figured out that a simpler solution would work in this case so I decided to use a Singleton.
* **It was a requirement to have a button that goes to the previous screen, why you didn't do that?** I could implement it really easily using:
```
browserHistory.goBack()
```
but I went yesterday to an ATM to withdraw money just to get the UX feeling and I figured out that it makes no sense in none of the cases:
	1. First screen has no back because there's no back screen.
	2. In enter PIN screen, back is to take out the card.
	3. Select amount screen, makes no sense to go back and enter the PIN again, so you get the card back.
	4. Card and money are out, no way to go back.

######Things that I'm not happy about
As I mentioned before, animations are not working fine, and the solution goes over changing the type of animation or the architecture. In my opinion, I think I could do a bit better use of React, dividing in more components, doing a bit more of use of state and props, to reduce the amount of JSX in every screen.
