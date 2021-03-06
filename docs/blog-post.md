<!-- markdownlint-disable MD033 -->

# Egoprogramophobia, or fear of one's own code: how testing can change your life

## The Young Developer

> When I was young, it seemed that life was so wonderful<br>
> A miracle, oh it was beautiful, magical<br>
> And all the birds in the trees, well they'd be singing so happily<br>
> Oh joyfully, playfully watching me<br>
>
> -- [Logical Song, SuperTramp](https://www.youtube.com/watch?v=J_NGulTmh88)

When I was young, everything was wonderful. I just got my first PC, and learned the art of software development (in Basic and Pascal, no less). I was happy writing little programs for myself. I wrote little games, I wrote little utilities. Life was beautiful. I had a bug? No matter—I fixed it. Or not.

Deadlines? What’s that? The code is too complex? It never was. This was really small code. I wrote code, and ran it, and fixed it till it worked. Mostly worked. And if I wanted to add a feature? I just wrote the code, and ran it, and fixed it till it worked. Mostly worked. And what if that feature broke some other feature’s code? No matter—I ran it, and fixed it till it worked. Refactoring? Well, I didn’t understand the concept at the time. But if I did, I would have rewritten the code, probably broken a lot of code, but no matter—I would have run it, and fixed it till it worked.

## The Logical Developer

> But then they send me away to teach me how to be sensible<br>
> Logical, oh responsible, practical<br>
> And they showed me a world where I could be so dependable<br>
> Oh clinical, oh intellectual, cynical<br>
>
> -- [Logical Song, SuperTramp](https://www.youtube.com/watch?v=J_NGulTmh88)

But then I grew up, and started working as a software developer. And everything stopped being wonderful. Oh, in the beginning, everything was nice and dandy. I got to develop a product, and I did. Worked on my code, ran it, and fixed it till it worked. Life was wonderful.

Till I deployed my code to production. And got the shakes. Every time I deployed to production, my hands shook.

Why? Because when I added a feature, I wrote the code, and and ran it, and fixed it till it worked. Mostly worked. But I was not a kid anymore. “Mostly worked” doesn’t cut it as an adult. The new feature must work, but so should everything else. The problem was that I was fearful that my new code broke something else. **I feared my own code**.

Refactoring code? You must be kidding. The fear of breaking my own code stopped me from doing any major refactorings. I was not brave enough. I had a bad case of **Egoprogramophobia**, fear of my own code. Symptoms? The shakes before deployment, and an inability to refactor.

So I went to my managers. And they taught me how to be sensible. Logical. Responsible. Practical. They made me manually test every little thing. Refactorings? Forget about it. My changes were surgical, clinical, cynical. Any bug fix was as small a change as I could make it, for fear of breaking stuff. Which means my code got more and more spaghetti-like.

But it wasn’t enough. My managers brought in a QA team to help me. And they vetted every release I had. That helped a lot, but it also made the whole deployment cycle slower. And my spaghetti-like code made my writing slower and slower. And the velocity of the product suffered from this.

And my managers? They just shrugged their shoulders, added Jira to my toolset, and told me, “Hey, kiddo, that’s how it is. That’s software development in the grownup world”.

## The Questioning Developer

> There are times when all the world's asleep<br>
> The questions run too deep<br>
> For such a simple man<br>
> Won't you please, please tell me what we've learned<br>
> I know it sounds absurd<br>
> Please tell me who I am<br>
>
> -- Logical Song, SuperTramp<br>

Is this it? Is this software development? Does everyone have **Egoprogramophobia**? The shakes? Isn’t there an alternative way?

There is. Everybody knows it, but rarely do they practice it. It’s called developer testing. The benefits are huge—you can become that happy, joyful developer, looking at their code with wonder, as a miracle of beauty. I promise that if you practice testing, you will never again fear your own code. You will abolish your **Egoprogramophobia**.

But I won't lie to you: it isn’t easy, and the ramp up time is high. This blog post can only send you on the path to developer testing, but it can’t make you walk the path. It can show you the beginning of a path, and maybe give you a map, but there are many paths, and many maps. It is up to you to find the path (and map) that is right for you.

## The Testing Developer

> I said, watch what you say or they'll be calling you a radical<br>
> Liberal, oh fanatical, criminal<br>
>
> -- Logical Song, SuperTramp<br>

So how do we start on the path to testing? By writing tests! We’ll start by writing one test for each kind of test that is usually written: a unit test, an integration test, and an end to end test. Once we have our atoms, we’ll see how to tie them together to a testing strategy. But first: write tests!

We’ll be writing tests for the TodoMVC app. I cloned one of the implementations, and updated it to the latest versions of React, Redux, and Webpack. You can find it [here](http://egoprogramophobia.surge.sh/), and the source code, which you can use to follow this post, [here](https://github.com/giltayar/egoprogramophobia). It includes the code for the app _and_ the tests.

(Oh, and this testing tutorial is for frontend developers. You’re using NodeJS? Sorry. Maybe next blog post…?)

## The End to End Developer

We’re going to start with an End To End test. It is customary to start with unit tests, progress to integration, and end with E2E tests, but I believe it helps to start with an E2E test. Moreover, if you already have existing code which you want to start writing test for, the best place to start is to write an E2E test.

We’ll be using [Cypress](https://cypress.io), a cool testing framework designed specifically for E2E frontend tests. We’ll start by installing cypress and running it once:

```sh
npm install --save-dev cypress
npx cypress open
# ...and then close cypress manually
```

Cypress created the files and folders we need to run tests (neat, no?). Let’s write a test:

```js
it('should add todos, and complete them', () => {
  cy.visit('http://localhost:5000')

  // Add todos
  cy.get('.new-todo').type('Clean House{Enter}')
  cy.get('.new-todo').type('Use Redux{Enter}')
  cy.get('.new-todo').type('Write Tests{Enter}')

  // Validate they were added
  cy.get('.todo-list > li').should('have.length', 3)

  cy.get(':nth-child(3) > .view > label').should('have.text', 'Clean House')
  cy.get(':nth-child(2) > .view > label').should('have.text', 'Use Redux')
  cy.get(':nth-child(1) > .view > label').should('have.text', 'Write Tests')

  // Complete a todo
  cy.get(':nth-child(2) > .view > .toggle').click()

  // Filter on active todos
  cy.contains('Active').click()
  // Validate that it was completed
  cy.get('.todo-list > li').should('have.length', 2)
})
```

See that first line, with `it(...)`? That's a **test function**—it defines _one_ test, and you can have as many
of these tests as you like in one file, or just split them up into multiple files, according to some grouping, like grouping them by feature.

And where does the `it` function come from? From [Mocha](https://mochajs.org/), the test framework used internally by Cypress to run tests.

The test is mostly easy to follow. `cy.get` enables you to "get" a DOM element, and do things on it like `.type(...)` and `.click()`. To validate something, you can use `.should(...)` with some condition. Now that you know this, you can follow the test and see that it adds three todos; validates that they were actually added; completes one and validates that it was completed.

This is usually how tests are constructed: actions, validations, actions, validations. It is common practice for each set of actions + validations to have their own test, but this is NOT true for E2E tests. There should be as few E2E tests as possible, and they should follow a user use-case, which could mean many pages of interactions. It's fine. That's what E2E tests are for. They are not supposed to be the tool you use to test _everything_. Rather they are there just to ensure that all the unit and integration tests, when run in a browser, all together, actually _do_ work. So remember—if you have too many E2E tests, and running them takes more than a minute, then you have too many of them and you should be replacing some of them with unit or integration tests.

But enough theory. How do we run the tests? The best and simplest way is to use [npm scripts](https://deliciousbrains.com/npm-build-script/). First, we write an npm script that opens cypress (in `package.json`):

```js
  "scripts": {
    // ...
    "cypress:open": "cypress open",
    //...
  }
```

If we do `npm run cypress:open`, cypress opens and we can run the test. But there is a slight problem—the test assumes that the server runs and is serving the application. We need something that runs the server and then runs the test.

Fortunately, if we `npm install --save-dev start-server-and-test` (built by [@bahmutov](https://twitter.com/@bahmutov), one of the co-writers of Cypress), we can do exactly that—start the server and run the test, using:

```js
  "scripts": {
    //...
    "start": "serve -s dist",
    "cypress:open": "cypress open",
    "test:open": "start-server-and-test start http://localhost:5000 cypress:open",
    //...
  }
```

Now if we `npm run test:open`, we can run our e2e test. If you want to run it without human, interaction, use:

```js
  "scripts": {
    //...
    "start": "serve -s dist",
    "cypress:run": "cypress run",
    "cypress:test": "start-server-and-test start http://localhost:5000 cypress:run",
    "test": "npm run cypress:test",
    //...
  }
```

And just run `npm test`, which is the canonical way to run all the tests in a package.

Done with E2E testing? It's time for those unit tests.

## The Unit Developer

What are unit tests? We've seen End to End tests, which are tests that test the _whole_ application. Unit tests are on the other end of the spectrum—they test only one unit of code, be it a class, a function, or a module.

Unit tests are the basics of testing. I've heard developers boast that they "have tests", and then you find that its mostly unit tests. That's great! But it's not enough. Some schools of testing emphasis unit tests, and believe that most of your tests should be unit tests. I tend to emphasize integration tests, but hey, as long as you have all these tests, that's OK.

My unit tests tend to test functions that are simple to test, i.e. functions (or classes), that have a very defined input, do something very specific, and have a very specific output. Also, what I test _usually_ doesn't depend on other units, or depend on them in a very small manner. If your units depend on a lot of other units, try and break them apart so they are not dependent. If that is not possible—use mocks (which are out of scope for this article), or just don't test them with unit tests, but rather using integration tests (which is what I do).

A classical thing to unit test is a reducer (in React/Redux). This is a simple function that embodies the business logic related to changing the test. Let's test the ["todo" reducer](https://github.com/giltayar/egoprogramophobia/blob/master/reducers/todos.js):

```js
import {expect}  from 'chai'
import reducer from '../../reducers/todos'
import {ADD_TODO, DELETE_TODO, COMPLETE_TODO} from '../../constants/ActionTypes'

describe('todo reducers', function() {
  it('should ADD_TODO', () => {
    const newState = reducer([], {type: ADD_TODO, text: 'Clean House'})

    expect(newState).to.eql([{id : 0, completed: false, text: 'Clean House'}])
  })

  it('should DELETE_TODO', () => {
    const todoAddedState = [
      {id : 4, completed: false, text: 'Clean House'},
      {id : 5, completed: false, text: 'Write Tests'}
    ]

    const todoDeletedState = reducer(todoAddedState, {type: DELETE_TODO, id: 4})

    expect(todoDeletedState).to.eql([{id : 5, completed: false, text: 'Write Tests'}])
  })

  it('should COMPLETE_TODO', () => {
    const todoAddedState = [
      {id : 4, completed: false, text: 'Clean House'},
      {id : 5, completed: false, text: 'Write Tests'}
    ]

    const todoCompletedState = reducer(todoAddedState, {type: COMPLETE_TODO, id: 5})

    expect(todoCompletedState).to.eql([
      {id : 4, completed: false, text: 'Clean House'},
      {id : 5, completed: true, text: 'Write Tests'}
    ])
  })
})
```

Notice the `it` function? Yup, we're using Mocha as our testing framework. Feel free to use Jest, Tape, Ava, or whatever you like. It doesn't matter, and don't let the horde of fanatics convince you otherwise!

We've added `describe`, which is Mocha's way of grouping tests together, but otherwise, it's the same Mocha as in the Cypress tests. But this time, _we're_ running Mocha (and not Cypress), so we need to install it (and chai, which is the validation library used for the `expect`).

```sh
npm install --save-dev mocha chai
```

But the tests are similar to the E2E, in that they follow the "actions, validations" formula. In this case, calling the reducer is the action, and the validation is checking that the resulting state is valid.

How do run the test? We add an "npm script": `"test:mocha": "mocha test/unit/*.test.js"`.

Note an important thing here: the tests **are running under NodeJS**. While their final destination is the browser, NodeJS can run the code as well. And we use the fact that 99% of the code in our source is isomorphic, i.e. runs in both the browser and in NodeJS.

But NodeJS doesn't understand `import` statements! What do we do? We use the wonderful `@babel/register`, and require it at the start of the test, using `mocha -r @babel/register test/unit/*.test.js`. `@babel/register` transpiles the `import` statements to NodeJS `require` statements, and everything works transparently. And it's using the same configuration that we're using to transpile the code in the browser, so it's perfect!

Unit tests are the easiest: if you can test a function using unit tests, do it! It's the highest ROI of them all, and remember—you can run thousands of unit tests in seconds.

But let's go to the most interesting tests of all: integration tests.

## The Integration Developer

There are two types of integration tests, so if you talk to somebody about them, make sure you are both talking of the same type of tests:

* Tests that check your code's integration with an external service such as your backend service, or Firebase, or an OAuth provider.
* Tests that check multiple units together.

The tests I'm going to show now are a bit of both. They both check multiple units together, and also test them
inside the DOM. We're going to test our components. Specifically we're going to test the app, but without using a browser. And we're going to test them in NodeJS, using a wonderful library called `jsdom`.

The idea, usually, is not to test the whole app, but rather any subset of the app that makes sense. But I have limited space for testing a subset, so I'll do the simple thing (in this redux app), and just test it all:

```js
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {JSDOM} from 'jsdom'
import {render} from 'react-dom'
import React from 'react'
import {Provider} from 'react-redux'
import {fireEvent} from 'dom-testing-library'

import App from '../../containers/App'
import configureStore from '../../store/configureStore'

describe('App', function() {
  let $, $$
  beforeEach(() => {
    global.window = new JSDOM('<div id="root"></div>').window
    global.document = window.document
    $ = document.querySelector.bind(document)
    $$ = document.querySelectorAll.bind(document)
  })

  it('initial list contains no todos', async () => {
    // render the React App
    const store = configureStore()
    render(<Provider store={store}><App /></Provider>, document.getElementById('root'))

    // Validate empty todo list
    expect($$('.todo-list > li')).to.have.length(0)
  })

  it('should be able to add a todo', async () => {
    // render the React App
    const store = configureStore()
    render(<Provider store={store}><App /></Provider>, document.getElementById('root'))

    // Enter "Clean House" in "new todo"
    fireEvent.change($('.new-todo'), {target: {value: 'Clean House'}})
    fireEvent.keyDown($('.new-todo'), {key: 'Enter', keyCode: 13})

    // Validate it's there
    expect([...$$('.todo-list > li')]).to.have.length(1)
    expect($(':nth-child(1) > .view > label').textContent).to.equal('Clean House')
  })
})
```

Let's first note the `beforEach`. This is a Mocha function that runs before each test. Here is where we initialize our jsdom. JSDOM is a simulation of a browser's `window` and `document`, which actually works, and can "fool" React and most frontend code in thinking that it's running in a browser. We're also initializing `$` and `$$` to be nice and friendly when we use them in the test.

The first test just checks that the todo list is initially empty. Because this is a Redux app, we need to create a Redux "store", which is what `configureStore` does. Then we use React to render the application into the DOM. Then we check the DOM—is the todo list empty? The number of `li`-s in it should be 0.

The next test starts from zero, and renders the app as above. Then it changes the "New Todo" input element using
[Kent C. Dodd's](https://twitter.com/@kentcdodds) wonderful [DOM Testing Library](https://testing-library.com/). Validation is checking that the new todo element exists in the list.

These tests, because they're not running in the browser are _crazy_ fast. You can run thousands of them in under a minute. That is the power of frontend integration tests using JSDOM. You can test lots of functionality in your code, with very little code and very little bureaucracy. We didn't even run a server to test the app. And we don't have to test the whole application. We can test any subset of components we want, and that is what you should usually do.

## The Strategic Developer

There. We've covered the three main kinds of tests that happen in the frontend world: unit, integration, and e2e. Not too bad, huh? Well, yes. But here's a few tips before we go:

* **Not too many**: write tests, but don't stress on coverage. Don't try to kill yourself with _too_ many tests.
  So how many tests? Easy—till your hands don't shake on deployment. Use this deployment shakometer test to understand
  whether you have enough tests.
* **Tests grows in time**: and don't worry if you initially feel that you don't have enough. Your users,
  and your bugs, tell you when you have enough. And if you don't have enough, that production bug
  shows you where you lack tests. The rule: for each bug you find, add at least one test.
* **Run your code manually as little as possible**: wrote a feature? Don't test it manually. Try to test it as
  much as you can with tests. Of course, some frontend features are difficult to test without trying them
  manually, but try to do this as much as possible.
* **It doesn't have to be TDD**: many will try and convince you that TDD is the way to go. If it works for you,
  that's fine. But if it doesn't (and it doesn't for me), then that's fine too. It's the tests that are important,
  and not when and how you wrote them.
* **The tools don't matter**: Mocha or Jest? Selenium or Cypress? Choose whatever you like. They're all good. It's
  the tests that are important, and not the tool. But do try and choose a tool that is commonly used and
  not esoteric (please...)
* **There are fanatics out there**: don't listen to them. Choose your own path.
* **There's a lot too learn**: don't despair. Learn. It takes a year or two of testing to become proficient.
  Really. A year or two. Don't rush it.
* **No big projects**: the worst thing you can do is to start a "big test project" where you stop everything
  and write tests for _all_ your code. Stop! It'll never work. Write tests _in parallel_ with development. Start small, with one E2E test. Gain confidence and gain understanding in how to test your code, and how to write
  your code to be testable. Good coverage takes time. A year or two. Really. A year or two. Don't rush it.

## Overcoming Egoprogramophobia

> I must not fear. Fear is the mind-killer. Fear is the little-death that brings total
> obliteration. I will face my fear. I will permit it to pass over me and through me. And
> when it has gone past I will turn the inner eye to see its path. Where the fear has gone
> there will be nothing. Only I will remain.<br>
>
> -- [Dune, Frank Herbert](https://www.goodreads.com/book/show/234225.Dune)

Hopefully, this post will help you overcome your **Egoprogramophobia**. At least put you on the path to it.

Good luck!
