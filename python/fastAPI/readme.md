# first step is to create the virtual environment.

<!-- python3 -m venv venv -->

-What is virtual environment?
A virtual environment is a self-contained Python environment that allows you to isolate your project’s dependencies from the system Python environment.
which means we can install different versions of python and packages without affecting the system python environment.

-Why do we need a virtual environment?
We need a virtual environment to ensure that our project’s dependencies are not affected by the system Python environment . This is especially important when working on multiple projects that have different dependencies. By using a virtual environment, we can ensure that each project has its own isolated environment, and we don’t have to worry about dependencies conflicting with each other.

For example, let’s say we are working on a project that requires python 3.9 and a package called pandas. If we install pandas in the system Python environment, it will be available for all projects. But what if we are working on another project that requires python 3.8 and a package called numpy? If we install numpy in the system Python environment, it will conflict with pandas, and our project will not work. By using a virtual environment, we can install pandas in one virtual environment and numpy in another virtual environment, and they will not conflict with each other.

<!-- Create and activate a virtual environment and then install FastAPI: -->
<!-- source venv/bin/activate -->

# second step is to install the fastAPI and uvicorn.

<!-- pip install fastapi uvicorn -->
<!-- or -->
<!-- pip install "fastapi[all]" -->

-What is fastAPI?
FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints. It’s designed to be fast, scalable, and secure. It’s built on top of standard Python type hints and supports asynchronous programming.

-What is uvicorn?
Uvicorn is a Python ASGI server implementation that supports HTTP/1.1 and WebSockets. It’s a fast, production-ready ASGI server that can be used to run FastAPI applications.

<!-- to see all the installed packages, you can use the following command: -->
<!-- pip freeze -->
<!-- if u install "fastapi[all]", it will install all the dependencies. including uvicorn and graphql. -->

# third step is to create the main.py file.

touch main.py

# fourth step is to run the fastAPI.

uvicorn main:app --reload
