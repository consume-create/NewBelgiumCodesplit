This code splid example operates very similarly to our require.js framework. 

How it works:
 - open the page dist/index.html in a browser window.
 - you should see output
    module1 - a
    Module1-arg1-a-Module1-arg2-a

    module1 - b
    Module1-arg1-b-Module1-arg2-b

    module1 - c
    Module1-arg1-c-Module1-arg2-c

    module1 - d
    Module1-arg1-d-Module1-arg2-d

    module2 - a
    Module2-arg1-a-Module2-arg2-b
 
 - there are also console log
    - these logs explain what is running.

 - what you are seeing:
    - module main is what scrapes the simulated dynamic epi page with "random" blocks on it
    - at this point in the simulation, the model has been acted upon and the HTML has been rendered and the CSS and JS are now loading/running
    - the IndexModule is the only piece of code that is loaded on the HTML page, this page simulates our master layout.
        - the first 4 blocks use the same module, Module1
        - the fifth block uses a different block Module2

    - The index.module gets all divs with data-module tag and loads it (if its not already loaded) and runs it using the supplied variables
        - if it is loaded, it then uses the existing instance to run it

    - Divs have the following data args to allow for unique data to be rendered in the unique containers of the blocks
        - ContolId - unique to the container
        - data-arg-arg1 - argument to render
        - data-arg-arg2 - argument to render

- What we are struggling with
    - how do we have babel load jquery, bootstrap.js, or other JS libraries that already exist on a CDN?
    - in requireJS you can set paths to JS libraries in a CDN (jquery: "//code.jquery.com/jquery-3.3.1.min") then you can shim or require it later if you need it. it to only load once when needed and used again if it is needed to be used again.


We like how our current require framework operates because it only loads what is needed when its needed in a dynamic fashion, so different pieces of JS codea to be loaded depending on the need of the page, leveraging HTTP/2.0's packet acquisition engine.
What will it take to achieve this? do we need to implement a script loader as well as babel and webpack? since this isnt really what webpack was designed to do.