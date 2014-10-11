# {%= name %}

{%= description %}

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.
{% if (gratipay_username) { %}
## Donating
Support this project and others by {%= gratipay_username %} via gratipay.

https://www.gratipay.com/{%= gratipay_username %}/
{% } %}{% if (unlicense) { %}
## Unlicense
As of {%= grunt.template.today('mmm dd yyyy') %}, {%= author_name %} has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: ../UNLICENSE{% } else if (licenses.length) { %}
## License
Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}

Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}
