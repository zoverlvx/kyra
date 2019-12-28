# kyra

## The Task
- Set up a Google APIs account
- Set up an application using the YouTube Data API (https://developers.google.com/youtube/v3/)
- Use the API to pull a list of all videos uploaded to the PAQ channel (https://www.youtube.com/channel/UCvO6uJUVJQ6SrATfsWR5_aA)
- Display a list of the videos, including thumbnails, on a page. The page should render the items in a way that works on both mobile and desktop browsers.
- Make sure that this list is kept up to date regularly - either by having a task that refreshes backend data, or by pulling in data live into the application
- Stretch Task
- Display a graph, showing how many videos were uploaded per week, over the last 18 months. A graphing library such as Google Charts or Highcharts is typically useful for this step.

## 12 Factors approach

Recall the Heroku team's [12 factor app](https://12factor.net/):

- **I. Codebase**
One codebase tracked in revision control, many deploys
- **II. Dependencies**
Explicitly declare and isolate dependencies
- **III. Config**
Store config in the environment
- **IV. Backing services**
Treat backing services as attached resources
- V. Build, release, run
Strictly separate build and run stages
- VI. Processes
Execute the app as one or more stateless processes
- VII. Port binding
Export services via port binding
- VIII. Concurrency
Scale out via the process model
- IX. Disposability
Maximize robustness with fast startup and graceful shutdown
- X. Dev/prod parity
Keep development, staging, and production as similar as possible
- **XI. Logs**
Treat logs as event streams
- XII. Admin processes
Run admin/management tasks as one-off processes
