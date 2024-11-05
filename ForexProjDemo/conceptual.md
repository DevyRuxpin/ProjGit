### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?

Python is known for its readability and its extensive standard library. JavaScript is used primarily for web development, to create interactive web pages, and is executed in browser.


- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.

Use the "get" method or "in" method


- What is a unit test?


Where the individual units of software are tested in isolation.


- What is an integration test?

Where individual units or components are combined and tested as a group to ensure they work together.



- What is the role of web application framework, like Flask?

It provides tools to handle common tasks like managing   web page addresses, processing user requests, and displaying web pages, so you can focus on creating your app's features.


- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?
  
Use a parameter in a route URL (like /foods/pretzel) when the information is essential to the resource being accessed, making the URL more readable and meaningful. Use a URL query parameter (like foods?type=pretzel) when the information is optional or used for filtering or searching within a resource.  


- How do you collect data from a URL placeholder parameter using Flask?

You can collect data from a URL placeholder parameter in Flask by defining the parameter in the route and then accessing it in the view function.



- How do you collect data from the query string using Flask?

You can collect data from the query string in Flask using the request object's args attribute


- How do you collect data from the body of the request using Flask?

You can collect data from the body of the request in Flask using the request object's form attribute for form data or json attribute for JSON data.


- What is a cookie and what kinds of things are they commonly used for?

A cookie is a small piece of data stored on the user's browser by a website. They are commonly used for session management, storing user preferences, and tracking user behavior on the site.



- What is the session object in Flask?

The session object in Flask is used to store data that you want to persist across multiple requests from the same user. It allows you to keep track of user-specific information, such as login status or preferences, throughout their interaction with your web application.



- What does Flask's `jsonify()` do?

Flask's jsonify() function converts Python data structures (like dictionaries and lists) into JSON format and returns it as a response, making it easy to send JSON data from your Flask application to the client.
