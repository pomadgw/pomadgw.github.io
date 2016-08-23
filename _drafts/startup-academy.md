---
layout: post
title:  "Start-up Academy Compfest: A Diary"
date:   2016-08-08 15:29:00 +0700
author: Rahadian Yusuf
tags:
- startup
- compfest
- collage
---

Since middle of June 2016, I have internship at a company in Jakarta, and they use
Ruby on Rails as their main web framework. While I once have code in Ruby before,
never I had touched Rails.
<!-- more -->

What I found is that Rails extends Ruby to the point that make Rails looks like a
*different language* from Rails. It is possible due to the flexibility of Ruby.
Oh, if you learn Ruby, you will find that in its syntax, parentheses is **optional**
for invoking methods (except, of course, if you want to clarify which parameters to
whose methods, and Ruby's [de facto] styleguide that advice you to add such parentheses
to custom-defined methods, oh just [see here](https://github.com/bbatsov/ruby-style-guide#method-invocation-parens)).

Here is the example of the code:

~~~ ruby
class Model < ActiveRecord::Base
end
~~~

That code works in Rails, provides that there exists a table called `models` in
the database configured in Rails.

<!--
  
  -->