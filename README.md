# Project 4: Developer Insights - Django and React Application

Group size: solo project - ***[Anna Wilczynska](https://github.com/anwilcz)*** 
</br>
Duration: ***7 days***
</br>
Technologies used: ***JavaScript, React, Sass, Plotly.js, Express, Node.js, Python, Django***
</br>
</br>
![Main image](https://res.cloudinary.com/dulbdr0in/image/upload/v1642026312/ReadMe%20Images/SEI_ReadMes/Insights/dev_insights-main_ivrdkw.png)
</br>
### [✨ View deployment ✨](https://dev-insights.herokuapp.com/)
</br>

## Brief

The aim was to build a full-stack application with a React frontend and a Django back-end implementing RESTful API to serve all CRUD routes. 

## Guest credentials
username: anwilcz </br> 
password: pass123% </br>

## Contents

- [Overview](#overview)
 - [Concept](#concept)
 - [Community](#community)
- [Technologies used](#technologies-used)
  - [Languages](#languages)
  - [Database](#database)
  - [Frameworks and libraries](#frameworks-and-libraries)
  - [Environment](#environment)
  - [Dependencies](#dependencies)
- [Planning](#planning)
  - [Approach and planning](#approach-and-planning)
- [Project development](#project-development)
  - [Backend](#backend)
    - [Backend frameworks and libraries](#backend-frameworks-and-libraries)
    - [Models](#models)
    - [Relationships](#relationships)
    - [Authentication](#authentication)
    - [Data validation](#data-validation)
    - [Seeding](#seeding)
  - [Frontend](#frontend)
    - [Frontend frameworks and libraries](#frontend-frameworks-and-libraries)
    - [Data visualisation](#data-visualisation)
    - [Responsive design](#responsive-design)
- [Deployment](#deployment)
- [Installation](#installation)
- [Wins and challenges](#wins-and-challenges)
- [Key learning](#key-learning)
- [Future upgrades](#future-upgrades)
- [Copyright and licensing](#copyright-and-licensing)

## Overview
Fourth project built during the Software Engineering Immersive course at the General Assembly.

### Concept
This application reuses public survey data from Stack Overflow to present detailed survey results for developer's tools such as programming languages, databases or frameworks instead of general results for the community and popularity of the tools. The original data collection is restructured to examine the profile of two groups: professional developers and non-professionals who either have experience working with the examined tool or wish to work with it in their future careers.</br>
</br>
![Concept](https://res.cloudinary.com/dulbdr0in/image/upload/v1642028850/ReadMe%20Images/SEI_ReadMes/Insights/dev_insights_concept_tiswc7.png)
</br>
### Community 
The app allows users to register and create a customizable profile that can be viewed by other members of the community. Registered users can change profile descriptions, upload a profile picture and also add tools to their favourites list. 

## Technologies used
### Languages
- **Python** - backend, data processing
- **JavaScript** - frontend
- **Sass** - styling

### Database
- **Postgresql**

### Frameworks and libraries
- **React** - builds frontend of a single-page application
- **Django** - structures backend of the application
- **Axios** - serves HTTP requests
- **Plotly.js** - graphing library
- **Pillow** - imaging library to handle direct upload
- **Animate.CSS** - animations

### Environment
- **Node.js**  - server setup

### Dependencies
### Frontend dependencies
- animate.css v4.1.1
- animate.css-react v1.1.0
- axios v0.21.4
- http-proxy-middleware v1.3.1
- plotly.js v2.7.0
- plotly.js-dist v2.7.0
- react v17.0.2
- react-dom v17.0.2
- react-plotly.js v2.5.1
- react-router-dom v6.0.2
- react-scripts: 4.0.3
- sass v1.44.0

### Backend dependencies
- django-import-export v2.6.1
- djangorestframework
- django-on-heroku
- pillow
- pyjwt

## Planning
### Approach and planning
Before committing to the development phase of the project, it was necessary to prepare a draft of the wireframe that could be used to identify the endpoints, components and relationships between backend models.</br>
</br>
The sketch below illustrates the structure of components and the look the project was aiming for.</br>
</br>
![Planning](https://res.cloudinary.com/dulbdr0in/image/upload/v1642029608/ReadMe%20Images/SEI_ReadMes/Insights/dev_insights_planning_czjdyz.png)

## Project development

### Backend
### Data collection
The original data collection consists of over 80.000 responses from developers from all over the World. </br>
</br>
A separate Python program was built to iterate through the original CSV file and examine developers' experience with each of the programming tools separately, so we can have a clear view of the profile of developers’ working with that tool as well as those, who are willing to work with the tool in the future career.</br>
</br>
Python runs through all the rows of the CSV file and calculates the number of votes assigned to the tool in the examined branch. The program converts Python native objects into JSON objects and saves the output into a new file that is used to seed the database.</br>
</br>
The original CSV file was downloaded from [here](https://insights.stackoverflow.com/survey).</br>
</br>
This is an example of a generated JSON object for `HTML/CSS`:</br>

```
{
      "id": 2,
      "name": "HTML/CSS",
      "category": "languages",
      "image": "image url",
      "worked_with": 46259,
      "worked_with_prof_devs": 32962,
      "worked_others": 13297,
      "worked_with_independent": 5149,
      "worked_with_full_time": 28107,
      "worked_with_part_time": 1422,
      "worked_with_unemployed": 2461,
      "worked_with_student": 8501,
      "worked_with_prefer_not_to_say": 457,
      "worked_with_na": 55,
      "worked_with_company_size": {
            "id": 2,
            "_just_me": 2613,
            "_2_to_9_employees": 4246,
            "_10_to_19_employees": 3354,
            "_20_to_99_employees": 6963,
            "_100_to_499_employees": 5447,
            "_500_to_999_employees": 1881,
            "_1000_to_4999_employees": 3051,
            "_5000_to_9999_employees": 1040,
            "_10000_or_more_employees": 3665,
            "tool": 2
      },
      "worked_with_country": {
            "id": 2,
            "united_states_of_america": 8492,
            "united_kingdom": 2450,
            "india": 5844,
            "germany": 3030,
            "france": 1592,
            "canada": 1690,
            "brazil": 1220,
            "poland": 904,
            "netherlands": 1220,
            "italy": 961,
            "tool": 2
      },
      "wants_to_work_with": 29353,
      "wants_to_work_with_prof_devs": 20806,
      "wants_to_work_with_others": 8547,
      "wants_to_work_with_independent": 3504,
      "wants_to_work_with_full_time": 17628,
      "wants_to_work_with_part_time": 886,
      "wants_to_work_with_unemployed": 1598,
      "wants_to_work_with_student": 5342,
      "wants_to_work_with_prefer_not_to_say": 288,
      "wants_to_work_with_na": 32,
      "wants_to_work_with_company_size": {
            "id": 2,
            "_just_me": 1798,
            "_2_to_9_employees": 2861,
            "_10_to_19_employees": 2100,
            "_20_to_99_employees": 4330,
            "_100_to_499_employees": 3412,
            "_500_to_999_employees": 1173,
            "_1000_to_4999_employees": 1927,
            "_5000_to_9999_employees": 601,
            "_10000_or_more_employees": 2291,
            "tool": 2
      },
      "wants_to_work_with_country": {
            "id": 2,
            "united_states_of_america": 5373,
            "united_kingdom": 1487,
            "india": 3629,
            "germany": 1965,
            "france": 967,
            "canada": 1040,
            "brazil": 843,
            "poland": 614,
            "netherlands": 843,
            "italy": 640,
            "tool": 2
      },
      "linux_prof_dev": 4999,
      "mac_os_prof_dev": 6039,
      "windows_prof_dev": 10333,
      "linux_others": 4999,
      "mac_os_others": 6039,
      "windows_others": 10333
	}
```

### Backend frameworks and libraries
The backend was built with Django, Django RESTful framework and Python. The project database is managed by PostgreSQL. </br>
</br>
Accepting user requests and returning web responses is facilitated by multiple class-based API Views that can be reached from the following URL patterns:</br>
</br>
```
urlpatterns = [
       path('api/admin/', admin.site.urls),
       path('api/tools/', include('tool.urls')),
       path('api/auth/', include('jwt_auth.urls')),
       path('api/profile/', include('user.urls')),
       re_path(r'^.*$', index)
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
</br>
</br>
Endpoints for CRUD requests:

- **Tools list**</br>
  **GET** /api/tools/ </br>
  **URL:** `https://dev-insights.herokuapp.com/api/tools/` 
  
- **Tool**</br>
  **GET** /api/tool/:id/</br>
  **URL:** `https://dev-insights.herokuapp.com/api/tools/:id/` 
  
- **User Profile**</br>
  **GET** /api/profile/username/</br>
  **POST** /api/profile/username/ - requires authentication</br>
  **PUT** /api/profile/username/ - requires authentication</br>
  **URL:** `https://dev-insights.herokuapp.com/api/profile/username/` 
   
- **Login**</br>
  **POST** /api/auth/login/</br>
  **URL:** `https://dev-insights.herokuapp.com/api/auth/login/` 
  
- **Register**</br>
  **POST** /api/auth/register/</br>
  **URL:** `https://dev-insights.herokuapp.com/api/auth/login/`

</br>
Image upload is handled by multipart form data and requires the Pillow Python library to handle direct upload to the database. All the files are saved in the static folder - media root path.</br>
</br>

```
    STATIC_URL = '/static/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'client', 'build', 'static', 'media')
    MEDIA_URL = '/media/'
```

Default image URL is added to each newly created user profile.</br>

```
  image = models.ImageField(default='/profile_images/default.jpg', 
  upload_to='profile_images')
```

### Models
Django models are used to structure database objects and handle data validation. 
Each of the models owns a dedicated serializer that converts non-native data types to the native Python object.</br>
</br>
Exemplary Tool model:</br>

```
class Tool(models.Model):
     name = models.CharField(max_length= 50, default='name')
     category = models.CharField(max_length= 50, default='category')
     image = models.CharField(max_length= 200, default='image')
     worked_with = models.IntegerField(default=0)
     worked_with_prof_devs = models.IntegerField(default=0)
     worked_others = models.IntegerField(default=0)
     worked_with_independent = models.IntegerField(default=0)
     worked_with_full_time = models.IntegerField(default=0)
     worked_with_part_time = models.IntegerField(default=0)
     worked_with_unemployed = models.IntegerField(default=0)
     worked_with_student = models.IntegerField(default=0)
     worked_with_prefer_not_to_say = models.IntegerField(default=0)
     worked_with_na = models.IntegerField(default=0)
     wants_to_work_with = models.IntegerField(default=0)
     wants_to_work_with_prof_devs = models.IntegerField(default=0)
     wants_to_work_with_others = models.IntegerField(default=0)
     wants_to_work_with_independent = models.IntegerField(default=0)
     wants_to_work_with_full_time = models.IntegerField(default=0)
     wants_to_work_with_part_time = models.IntegerField(default=0)
     wants_to_work_with_unemployed = models.IntegerField(default=0)
     wants_to_work_with_student = models.IntegerField(default=0)
     wants_to_work_with_prefer_not_to_say = models.IntegerField(default=0)
     wants_to_work_with_na = models.IntegerField(default=0)
     linux_prof_dev = models.IntegerField(default=0)
     mac_os_prof_dev = models.IntegerField(default=0)
     windows_prof_dev = models.IntegerField(default=0)
     linux_others = models.IntegerField(default=0)
     mac_os_others = models.IntegerField(default=0)
     windows_others = models.IntegerField(default=0)
```

In order to create a profile when a user is successfully registered, it was necessary to overwrite the create function in UserSerializer.</br>

```
class Profile(models.Model):
     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
     slogan = models.CharField(max_length=100, blank=True)
     location = models.CharField(max_length=100, blank=True)
     image = models.ImageField(default='/profile_images/default.jpg', upload_to='profile_images')
     favourited = models.ManyToManyField(Tool, blank=True)
```

```
class UserSerializer(serializers.ModelSerializer):
     password = serializers.CharField(write_only=True)
     password_confirmation = serializers.CharField(write_only=True)
     profile = ProfileSerializer(read_only=True)

     def validate(self, data):

           password = data.pop('password')
           password_confirmation = data.pop('password_confirmation')

           if password != password_confirmation:
                 raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

           try:
                 validations.validate_password(password=password)
           except ValidationError as err:
                 raise serializers.ValidationError({'password': err.messages})

           data['password'] = make_password(password)
           return data

     class Meta:
           model = User
           fields = ('id', 'username', 'email', 'password', 'password_confirmation', 'profile',)

     def create(self, validated_data):
           user = User.objects.create(**validated_data)
           Profile.objects.create(user=user)
           user.save()
           return user
```

Each of the nested objects such as dictionaries or arrays owns a separate serializer that allows data to be returned in the desired format as a response.</br> 

```
class ProfileSerializer(serializers.ModelSerializer):
     class Meta:
           model = Profile
           fields = ('user', 'slogan', 'location', 'image', 'favourited',)
```
### Relationships
One to One relationship links Profile with the User
Many to Many relationships exist between user profiles and favorited tools.</br>

```
class Profile(models.Model):
     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
     slogan = models.CharField(max_length=100, blank=True)
     location = models.CharField(max_length=100, blank=True)
     image = models.ImageField(default='/profile_images/default.jpg', upload_to='profile_images')
     favourited = models.ManyToManyField(Tool, blank=True)
```

Nested objects are linked to the Tool by OneToOneField</br>

```
class WorkedWithCompanySize(models.Model):
     tool = models.OneToOneField(Tool, related_name='worked_with_company_size', on_delete=CASCADE, default=1)
     _just_me = models.IntegerField(default=0)
     _2_to_9_employees = models.IntegerField(default=0)
     _10_to_19_employees = models.IntegerField(default=0)
     _20_to_99_employees = models.IntegerField(default=0)
     _100_to_499_employees = models.IntegerField(default=0)
     _500_to_999_employees = models.IntegerField(default=0)
     _1000_to_4999_employees = models.IntegerField(default=0)
     _5000_to_9999_employees = models.IntegerField(default=0)
     _10000_or_more_employees = models.IntegerField(default=0)

```

```
class WorkedWithCountry(models.Model):
     tool = models.OneToOneField(Tool, related_name='worked_with_country', on_delete=CASCADE, default=1)
     united_states_of_america = models.IntegerField(default=0)
     united_kingdom = models.IntegerField(default=0)
     india = models.IntegerField(default=0)
     germany = models.IntegerField(default=0)
     france = models.IntegerField(default=0)
     canada = models.IntegerField(default=0)
     brazil = models.IntegerField(default=0)
     poland = models.IntegerField(default=0)
     netherlands = models.IntegerField(default=0)
     italy = models.IntegerField(default=0)
```

The on_delete attribute defines the behaviour of the object in case the parent is deleted from the database. 

### Authentication

Authentication is handled by the Django authentication model and based on the JWT token validation.</br>

```
class JWTAuthentication(BasicAuthentication):
     def authenticate(self, request):
           header = request.headers.get('Authorization')
           if not header:
                 return None
           if header.startswith('Basic'):
                 return None
           if not header.startswith('Bearer'):
                 raise PermissionDenied({'message': 'Invalid authorization header'})
           token = header.replace('Bearer ', '')
           try:
                 payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                 user = User.objects.get(pk=payload.get('sub'))
           except jwt.exceptions.InvalidTokenError:
                 raise PermissionDenied({'message': 'Invalid Token'})
           except User.DoesNotExist:
                 raise PermissionDenied({'message': 'User not found'})
           return (user, token)
```

Post and put requests of the user profile are secured with user authentication within the user profile API view.</br>

```
permission_classes = (IsAuthenticatedOrReadOnly,)
```

### Data validation
The application uses Django data validation with class-based Models. POST and PUT requests are checked with the requirements set on particular Model’s fields.</br>
</br>
For example, location field data has to be a String counting up to 100 characters but is not required to be present in the request object.</br>
</br>

```
location = models.CharField(max_length=100, blank=True)
```

### Seeding
The database is seeded with data collection processed by the Python program and preserved in seeds.json file inside of tool Django app. Instructions on how to seed the database are included in the installation section of this document.

### Frontend
### Frontend frameworks and libraries
The frontend of the project was built with React and libraries such as Plotly.js and Animate.CSS
Plotly.js is a JavaScript graphing library that allows the implementation of different kinds of data visualisation components. The project uses horizontal bar charts and pie charts that were adjusted to the application aesthetic goals. Animate.CSS was used to animate components transitions.

### Data visualisation
Data visualisation components are powered with the graphing library - Plotly.js, which combines the selection of bar and pie charts. 

### Responsive design
The application is adapted to different screen sizes and fully responsive on computer screens as well as mobile devices. The consistency of the data displayed on different screen sizes is maintained.</br>
</br>
![Responsive design](https://res.cloudinary.com/dulbdr0in/image/upload/v1642026308/ReadMe%20Images/SEI_ReadMes/Insights/dev_insights_responsive_design_do6ozm.png)

## Deployment
The application was deployed on Heroku.</br>
[[View deployment]](https://dev-insights.herokuapp.com/)

## Installation
1. Clone GitHub project repository to your local machine.
2. Install all dependencies - npm or yarn and pip required.
    - Backend:</br>
      Run `pipenv install`:</br>
      - django-import-export v2.6.1
      - djangorestframework
      - django-on-heroku
      - pillow
      - pyjwt
    - Frontend</br>
      Run `yarn add/npm install`:</br>
      - animate.css v4.1.1
      - animate.css-react v1.1.0
      - axios v0.21.4
      - http-proxy-middleware v1.3.1
      - plotly.js v2.7.0
      - plotly.js-dist v2.7.0
      - react v17.0.2
      - react-dom v17.0.2
      - react-plotly.js v2.5.1
      - react-router-dom v6.0.2
      - react-scripts: 4.0.3
      - sass v1.44.0
3. Run `pipenv shell` in the project root directory for the virtual environment.
4. Run `python manage.py runserver` to start the server in the root directory where manage.py lives.
5. The server will be running on localhost port: 8000</br>
`http://localhost:8000/`

### Seeding database
1. Create a PostgreSQL database named `dev-insights` </br>
   Or alternatively update the name in settings.py file:<br>
   
   ```
   DATABASES = {
         'default': {
               'ENGINE': 'django.db.backends.postgresql',
               'NAME': 'dev-insights',
         }
   }
   ```

2. Run python manage.py seed in the project directory where manage.py lives.

### Useful commands

- `python manage.py dumpdata seed.json` - to export data for backup.
- `python manage.py loaddata seed.json` - to load data to database.
- `python manage.py flush` - to remove all data from the database.
- `python manage.py makemigrations` - to make data migrations.
- `python manage.py migrate` - to apply data migrations.

## Wins and challenges

### Wins
- Successfully automated data processing with Python program - a huge time saver for preparing the collection of documents and seeding the database.
- Implementing reusable data visualisation components and making them responsive to window width.
- Achieving a responsive mobile design.
- Facilitating direct image upload.

### Challenges
- Processing and preparing data collection to seed a database based on the CSV file containing over 80.000 rows within a short time that was given.
- Sending multipart form data to handle direct image upload to the database.
- Learning Plotly.js graphing library on the last days of the project week.

## Key learning
- Reading and writing CSV files in Python, data processing and restructuring.
- Selecting and displaying data based on the search string.
- Expanding knowledge of the React hooks and the latest version update of the framework.
- Learning how to build and present data using graphing library and JavaScript.

## Future upgrades
- Most of the components are reusable and if I had more time, I could upload the survey data from the previous years and possibly compare it.
- Image upload could be facilitated by an external API such as Cloudinary due to safety and storage management reasons. I wanted to figure out how to upload images directly to the server, and it worked, however, it does not seem to be a perfect solution. When I redeploy the project, the images data is forfeited, unless saved in the GitHub project repository.
- User profiles list could be visible also for unauthenticated users.
- I could delete the user profile feature.
- Charts represented by SVG objects could be more interactive. I missed time to explore all the features of Plotly.js, and I am eager to learn its Python’s equivalent - Dash.

## Copyright and licensing
This project was built for educational purposes only.
