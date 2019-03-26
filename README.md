# [Validation-helpers](https://www.npmjs.com/package/validation-helpers)

Validation helpers makes you validate your body of request or any value you want with a simple set of rules with the help of [Validator](https://www.npmjs.com/package/validator) and other simple packages.

## Usage

```js
const { errors, isValid } = validationHelpers(value, rules);
```

`rules` need to be like

```js
new Builder().required().isMember(["foo", "bla", "hi"]).value;
```

## Example

```js
const { errors, isValid } =
        validationHelpers('hello',
              new Builder()
              .required()
              .isMember(['foo', 'bla', 'hi'],'Not a valid member')
              .value;
);
```

This will throw an error for isMember rule with a simple message `'Not a valid member'`.

Or the **old way** rules can be written with array of objects.

```js
[
  { type: Rules.REQUIRED },
  { type: Rules.IS_MEMBER, array: ["foo", "bla", "hi"] }
];
```

`type` must be a valid type from validationHelpers.Types every type may have a second property must be passed like

`{ type: Rules.IS_MEMBER, array: ['foo', 'bla', 'hi']`

## TODO

1. Write readable usage example.
2. Write Unit test for all cases.
3. Integrate with CI.
