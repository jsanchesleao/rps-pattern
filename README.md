# RPS Pattern

RPS stands to *Render*, *Process* and *State*. It's an architecture proposal for single page web applications.

It uses _React_ for the view, _Redux_ for state management and _js-csp_ for process management.

This repository serves both as an explanation of the pattern and as a boilerplate to start new apps using it.

[See the app running](http://jsanchesleao.github.io/rps-pattern/)


First of all, if you want to run the boilerpĺate, that is a demo "todo list" app, just clone this repository, npm install and npm start:

```bash
$ git clone https://github.com/jsanchesleao/rps-pattern.git
$ npm install
$ npm start
```

Basically the folder structure is like this:

- framework
- public
  - index.html
- src
  - actions
  - components
  - processes
  - reducers
  - styles
  - boot.jsx
  - channels.js

Lets walk through the folders as we discuss each concept of the architecture:

## public
This folder contains the static assets of the app. Here is the `index.html` file, together with any js (generated or not), css and pretty much anything you need to serve.

## framework
RPS is not a framework, it's only a pattern. This folder contains any code that you might need to *glue* things together. This is not a read only folder, as you can write code here that helps binding together the parts of your app.

Currently it comes only with a few functions that help integrate the view events to the _js-csp_ processes. Feel free to include here code to do things like XHR requests, data format manipulation, tool belts or anything. The only rule here is that code here _has nothing to do with your business rules_.

## src
Is the folder that contains the real code of your app. It is divided into five directories, each holding a concept of your app. This is not written in stone, so you don't need by any means to be restricted only to those. You can create here folders and modules that implement requirements of your app. Let's look at each of the five individually:

### components
Here you write the React components of your app. The only true rule here is that these components must _NOT_ hold state, and there must be a main component that accepts two attributes: `data` and `chans`. In `data` you pass all data needed for the app to render it's view. In `chans` you pass the _js-csp_ channels that your app needs. These channels are created within the `channels.js` file.

Notice that the reference component, `TodoList`, is created with the _stateless component syntax_  introduced in React 0.14. This is not a rule. The only rule here is that you must not hold state. That is because all state is being held within Redux.

### reducers
Implement here all reducers needed for Redux to work. To learn more about reducers and Redux itself, check their page [here](http://redux.js.org/)

### actions
It's just a place to hold files that declare which Redux actions can be performed by your application. This is not strictly required, but is good in case you app grows in size and actions need some organization. Again, check Redux documentation for more details on actions.

### processes
Write here all the _js-csp_ processes that perform the tasks your app need to. Just export functions that start the processes, that receive the Redux store and the channels object. Check the reference implementation for more details. It's good to check `js-csp`'s repository [here](https://github.com/ubolonton/js-csp).

### channels.js
List here all channels used by your app. I mean ALL of them. Use any structure you want. We suggest a single flat object with the channels, but as the app grows in size, it may be appropriate to change to a different layout of the channels object.

### boot.jsx
This files glues everything together and start the app. Here is code that start all the _js-csp_ processes, that renders the components and listens to the store. Use this file to do any setup logic and put things together.


## resources
Also, check these resources to learn more about the Redux pattern, about the CSP concurrency model and about React itself:

- [Lin Clark's A Cartoon Intro to Redux](https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6#.1nmpl626s)
- [Redux's Documentation](http://redux.js.org/)
- [js-csp's Repository](https://github.com/ubolonton/js-csp)
- David Nolen about CSP (clojurescript) [1](http://swannodette.github.io/2013/07/12/communicating-sequential-processes/) [2](http://swannodette.github.io/2013/07/31/extracting-processes/) [3](http://swannodette.github.io/2013/08/31/asynchronous-error-handling/)
- [Josh Black about Stateless React Components](https://medium.com/@joshblack/stateless-components-in-react-0-14-f9798f8b992d#.42cbhm1v8)
- [React's own documentation about reusable components](https://facebook.github.io/react/docs/reusable-components.html)
















