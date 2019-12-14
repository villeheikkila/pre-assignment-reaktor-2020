## Pre-assignment for junior developer positions

On a Debian and Ubuntu systems, there is a file called /var/lib/dpkg/status that holds information about software packages that the system knows about. Write a small program in a programming language of your choice that exposes some key information about packages in the file via an HTML interface.

- The index page lists installed packages alphabetically with package names as links. ✔️

- When following each link, you arrive at a piece of information about a single package. The following information should be included:
  - Name ✔️
  - Description ✔️
  - The names of the packages the current package depends on (skip version numbers) ✔️
  - The names of the packages that depend on the current package ✔️
- The dependencies and reverse dependencies should be clickable and the user can navigate the package structure by clicking from package to package. ✔️

- The application must be available publicly on the internet. You can, for example, use Heroku to host it for free. Provide a link to the website in your job application. ✔️

- The source code must also be available publicly in GitLab or GitHub, and a link provided in your job application. ✔️

### Some things to keep in mind

- Minimize the use of external dependencies. The goal of the assignment is to view how you solve the problems with the programming language, not how well you use package managers. ✔️

- Please keep the code simple and sweet. The main design goal of this program is maintainability. We value the simplicity and readability of the code over the number of features. ✔️

- Only look at the Depends field. Ignore other fields that work kind of similarly, such as Suggests and Recommends. ✔️

- Sometimes there are alternates in a dependency list, separated by the pipe character |. When rendering such dependencies, render any alternative that maps to a package name that has an entry in the file as a link and just print the name of the package name for other packages. ✔️
