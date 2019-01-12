# refactoring-2nd-learning

This repository contains the code sample for the first chapter of
[Refactoring, 2nd ed, by Martin Fowler][ref_book].

## Purpose

I started this repository as a way to study the book in practice.

## How to explore

The way you can explore this repository is to step by each commit
from one of the `refactoring-*` branches. You can follow each commit
together with each step described in the book.

## Trivia

Have you heard of the [test && commit || revert][test-commit-revert]
workflow?

The idea is that when a test passes, you commit your code. However,
when the tests fail you lose all your code and will have to start from
scratch!

Kent Beck proposed this workflow not as an official way to code, but as
a way to learn more about writing tests. And I decided to give it a try!

In this project, this workflow is executed with the following command

```bash
yarn tdd
```

Try it too!

[ref_book]: https://www.amazon.com.br/Refactoring-Improving-Design-Existing-Code/dp/0134757599/ref=sr_1_1?ie=UTF8&qid=1543580425&sr=8-1&keywords=refactoring+2nd+edition
[test-commit-revert]: https://medium.com/@kentbeck_7670/test-commit-revert-870bbd756864