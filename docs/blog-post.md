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

But then I grew up, and started working as a software developer. And everything stopped being wonderful. Oh, in the beginning, everything was nice and dandy. I got to develop a product, and I did. Worked on my code, and tan it, and fixed it till it worked. Life was wonderful.

Till I deployed my code to production. And I got the shakes. Whenever I needed to deploy to production, my hands shook.

Why? Because when I added a feature, I wrote the code, and and ran it, and fixed it till it worked. Mostly worked. But I was not a kid anymore. “Mostly worked” doesn’t cut it anymore. The new feature must work, but so should everything else. I was fearful that my additional code broke something else. I feared my own code.
Refactoring code? You must be kidding. The fear of breaking my own code stopped me from doing any major refactorings. I was not brave enough. I had a bad case of Egoprogramophobia, fear of my own code. Symptoms? The shakes before deployment, and an inability to refactor.

So I went to my managers. And they taught me how to be sensible. Logical. Responsible. Practical. They made me manually test every little thing. Refactorings? Forget about it. My changes were surgical, clinical, cynical. Any bug fix was as small a change as I could make it, for fear of breaking stuff. Which means my code got more and more spaghetti-like.

But it wasn’t enough. So my managers brought in a QA team to help me. And they vetted every release I had. That helped alot, but it also made the whole deployment cycle slower. And my spaghetti-like code made my writing slower and slower. And the velocity of the product suffered from this.

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

Is this it? Is this software development? Does everyone have Egoprogramophobia? The shakes? Isn’t there an alternative way?

There is. Everybody knows it, but rarely do they practice it. It’s called developer testing. The benefits are huge—you can become that happy, joyful developer, looking at their code with wonder, as a miracle of beauty. I promise that if you practice testing, you will never again fear your own code. You will abolish your Egoprogramophobia.

But I will not lie to you: it isn’t easy, and the ramp up time is high. This blog post can only send you on the path to developer testing, but it can’t make you walk the path. It can show you the beginning of a path, and maybe give you a map, but there are many paths, and many maps. It is up to you to find the path (and map) that is right for you.

## The Testing Developer

> I said, watch what you say or they'll be calling you a radical<br>
> Liberal, oh fanatical, criminal<br>
>
> -- Logical Song, SuperTramp<br>

So how do we start on the path to testing? By writing tests! We’ll start by writing one test for each kind of test that is usually written: a unit test, an integration test, and an end to end test. Once we have our atoms, we’ll see how to tie them together to a testing strategy. But first: write tests!

We’ll be writing tests for the TodoMVC app. I cloned one of the implementations, and updated it to the latest versions of React, Redux, and Webpack. You can find it here, and the source code, which you can clone to follow this post, here. Oh, and this testing tutorial is for frontend developers. You’re using NodeJS? Sorry, maybe next blog post…

## The End to End Developer

We’re going to start with an End To End test. It is customary to start with unit tests, progress to integration, and end with E2E tests, but I believe it helps to start with an E2E test. Moreover, if you already have code, the best place to start is to write an E2E test.

We’ll be using Cypress, a cool testing framework designed specifically for E2E frontend tests. We’ll start by installing cypress and running it once.

```sh
npm install --save-dev cypress
npx cypress open
# ...and then close cypress manually
```

Cypress created the files and folders we need to run tests (neat, no?). Let’s write a test in `cypress/integration/todomvc-e2e.spec.js`:

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

See that 4th line, with `it(...)`? That's a **test function**—it defines _one_ test, and you can have as many
of these tests as you like in one file, or just split them up into multiple files, according to some logic, like
grouping them by feature.

And where does the `it` function come from? From [Mocha](https://mochajs.org/), the test framework used internally by Cypress to run tests.

The test is mostly easy to follow. `cy.get` enables you to "get" a DOM element, and do things on it like `.type(...)` and `.click()`. To validate something, you can use `.should(...)` with some condition. Now that you know this, you can follow the test and see that it adds three todos; validates that they were actually added; completes one and validates that it was completed.

This is usually how tests are constructed: actions, validations, actions, validations. It is common practice for each set of actions + validations to have their own test, but this is NOT true for E2E tests. There should be as few E2E tests as possible, and they should follow a user use-case, which could mean many pages of interactions. It's fine. That's what E2E tests are for. They are not supposed to be the tool you use to test _everything_. Rather they are there just to ensure that all the unit and integration tests, when run in a browser, all together, actually _do_ work. So remember—if you have too many E2E tests, and running them take more than a minute, then you have too many of them and you should be replacing some of them with unit or integration tests.

But enough theory. How do we run the tests? The best and simmplest way is to use [npm scripts](https://deliciousbrains.com/npm-build-script/). First, we write an npm script that opens cypress (in `package.json`):

```js
  "scripts": {
    // ...
    "cypress:open": "cypress open",
    //...
  }
```

If we do `npm run cypress:open`, cypress will be opened and we will be able to run the test. But there is a slight problem—the test assumes that the server runs and is serving the application. We need something that runs the server and then runs the test.

Fortunately, if we `npm install --save-dev start-server-and-test` (built by @bahmutov, one of the co-writers of Cypress), we can do exactly that—start the server and run the test, using:

```json
  "scripts": {
    //...
    "start": "serve -s dist",
    "cypress:open": "cypress open",
    "test:open": "start-server-and-test start http://localhost:5000 cypress:open",
    //...
  }
```

Now if we `npm run test:open`, we can run our e2e test. If you want to run it without human, interaction, use:

```json
  "scripts": {
    "start": "serve -s dist",
    "cypress:run": "cypress run",
    "test": "start-server-and-test start http://localhost:5000 cypress:run",
  }
```

And just run `npm test`, which is the canonical way to run all the tests in a package.

Done with e2e testing? It's time for those units.

## The Unit Developer


## The Strategic Developer

* Not too many
* Accrue over time due to bugs
* Try not to run your code. Develop through tests
* It doesn't have to be TDD
* It doesn't have to be Jest, or Mocha, or Cypress
