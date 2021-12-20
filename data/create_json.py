import csv
import json
import time

# with open('table_data.csv', 'r') as csv_file:
#   csv_reader = csv.reader(csv_file)

# Find keys in data_keys and return a list of results
def find_keys(data_keys, phrase):
  return list(filter(lambda key: phrase in key, data_keys))

# Reading data from csv file
def read_data(file):
  with open(file, 'r') as csv_file:
    data = list(csv.DictReader(csv_file))
    data_keys = data[0].keys()
    return data, data_keys

# Data specific keys structure [worked with, want to work with]
class Keys():
  def __init__(self, data_keys):
    self.languages = find_keys(data_keys, 'language')
    self.databases = find_keys(data_keys, 'database')
    self.platforms =	find_keys(data_keys, 'platform')
    self.webframes = find_keys(data_keys, 'webframe')
    self.misc_tech = find_keys(data_keys, 'misc_tech')	
    self.tools_tech = find_keys(data_keys, 'tools_tech')
    self.collab_tools = find_keys(data_keys, 'collab_tools')	
    self.op_sys = find_keys(data_keys, 'op_sys')

# Identify choices
def select_list(data, unique_key):
  new_list = []
  for line in data:
    for key in unique_key:
      values = line[key].split(';')
      for value in values:
        if value in new_list:
          pass
        else:
          new_list.append(value)
  return new_list

# Calculations
def calculate(data, name, key, cat=None, phrase=None, include= True, cat2=None, phrase2=None, include2= True):
  sum = 0
  for line in data:
    if name in line[key].split(';'):
      if cat == None:
        sum += 1
      else:
        if cat2 == None:
          if phrase in line[cat] and include == True:
            sum += 1
          elif phrase not in line[cat] and include == False:
            sum += 1
          else: 
            next
        else:
          if phrase in line[cat] and phrase2 in line[cat2] and include == True and include2 == True:
            sum += 1
          elif phrase in line[cat] and phrase2 not in line[cat2] and include == True and include2 == False:
            sum += 1
          else: 
            next
    else:
      next
  return sum

# Creating dicts
def dict(data, name, unique_key, category):

  return {
    'name': name,
    'category': category,
    'image': f'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{name}/{name}-original.svg',
    'worked_with': calculate(data, name, unique_key[0]),

    'worked_with_prof_devs': calculate(data, name, unique_key[0], 'main_branch', 'developer by profession'),
    'worked_others': calculate(data, name, unique_key[0], 'main_branch', 'developer by profession', False),

    'worked_with_independent': calculate(data, name, unique_key[0], 'employment', 'Independent'),
    'worked_with_full_time': calculate(data, name, unique_key[0], 'employment', 'Employed full-time'),
    'worked_with_part_time': calculate(data, name, unique_key[0], 'employment', 'Employed part-time'),
    'worked_with_unemployed': calculate(data, name, unique_key[0], 'employment', 'Not employed'),
    'worked_with_student': calculate(data, name, unique_key[0], 'employment', 'Student'),
    'worked_with_prefer_not_to_say': calculate(data, name, unique_key[0], 'employment', 'I prefer not to say'),
    'worked_with_na': calculate(data, name, unique_key[0], 'employment', 'NA'),
    'worked_with_company_size': {
      '_just_me': calculate(data, name, unique_key[0], 'org_size', 'Just me'),
      '_2_to_9_employees': calculate(data, name, unique_key[0], 'org_size', '2 to 9'),
      '_10_to_19_employees': calculate(data, name, unique_key[0], 'org_size', '10 to 19'),
      '_20_to_99_employees': calculate(data, name, unique_key[0], 'org_size', '20 to 99'),
      '_100_to_499_employees': calculate(data, name, unique_key[0], 'org_size', '100 to 499'), 
      '_500_to_999_employees': calculate(data, name, unique_key[0], 'org_size', '500 to 999'), 
      '_1000_to_4999_employees': calculate(data, name, unique_key[0], 'org_size', '1,000 to 4,999'), 
      '_5000_to_9999_employees': calculate(data, name, unique_key[0], 'org_size', '5,000 to 9,999'),
      '_10000_or_more_employees': calculate(data, name, unique_key[0], 'org_size', '10,000 or more'),
      },
    'worked_with_country': {
      'united_states_of_america': calculate(data, name, unique_key[0], 'country', 'United States'),
      'united_kingdom': calculate(data, name, unique_key[0], 'country', 'United Kingdom'),
      'india': calculate(data, name, unique_key[0], 'country', 'India'),
      'germany': calculate(data, name, unique_key[0], 'country', 'Germany'),
      'france': calculate(data, name, unique_key[0], 'country', 'France'),
      'canada': calculate(data, name, unique_key[0], 'country', 'Canada'),
      'brazil': calculate(data, name, unique_key[0], 'country', 'Brazil'),
      'poland': calculate(data, name, unique_key[0], 'country', 'Poland'),
      'netherlands': calculate(data, name, unique_key[0], 'country', 'Brazil'),
      'italy': calculate(data, name, unique_key[0], 'country', 'Italy'),
      },

    'wants_to_work_with': calculate(data, name, unique_key[1]),
    'wants_to_work_with_prof_devs': calculate(data, name, unique_key[1], 'main_branch', 'developer by profession'),
    'wants_to_work_with_others': calculate(data, name, unique_key[1], 'main_branch', 'developer by profession', False),

    'wants_to_work_with_independent': calculate(data, name, unique_key[1], 'employment', 'Independent'),
    'wants_to_work_with_full_time': calculate(data, name, unique_key[1], 'employment', 'Employed full-time'),
    'wants_to_work_with_part_time': calculate(data, name, unique_key[1], 'employment', 'Employed part-time'),
    'wants_to_work_with_unemployed': calculate(data, name, unique_key[1], 'employment', 'Not employed'),
    'wants_to_work_with_student': calculate(data, name, unique_key[1], 'employment', 'Student'),
    'wants_to_work_with_prefer_not_to_say': calculate(data, name, unique_key[1], 'employment', 'I prefer not to say'),
    'wants_to_work_with_na': calculate(data, name, unique_key[1], 'employment', 'NA'),
    'wants_to_work_with_company_size': {
      '_just_me': calculate(data, name, unique_key[1], 'org_size', 'Just me'),
      '_2_to_9_employees': calculate(data, name, unique_key[1], 'org_size', '2 to 9'),
      '_10_to_19_employees': calculate(data, name, unique_key[1], 'org_size', '10 to 19'),
      '_20_to_99_employees': calculate(data, name, unique_key[1], 'org_size', '20 to 99'),
      '_100_to_499_employees': calculate(data, name, unique_key[1], 'org_size', '100 to 499'), 
      '_500_to_999_employees': calculate(data, name, unique_key[1], 'org_size', '500 to 999'), 
      '_1000_to_4999_employees': calculate(data, name, unique_key[1], 'org_size', '1,000 to 4,999'), 
      '_5000_to_9999_employees': calculate(data, name, unique_key[1], 'org_size', '5,000 to 9,999'),
      '_10000_or_more_employees': calculate(data, name, unique_key[1], 'org_size', '10,000 or more'),
      },
    'wants_to_work_with_country': {
      'united_states_of_america': calculate(data, name, unique_key[1], 'country', 'United States'),
      'united_kingdom': calculate(data, name, unique_key[1], 'country', 'United Kingdom') ,
      'india': calculate(data, name, unique_key[1], 'country', 'India') ,
      'germany': calculate(data, name, unique_key[1], 'country', 'Germany') ,
      'france': calculate(data, name, unique_key[1], 'country', 'France'),
      'canada': calculate(data, name, unique_key[1], 'country', 'Canada'),
      'brazil': calculate(data, name, unique_key[1], 'country', 'Brazil'),
      'poland': calculate(data, name, unique_key[1], 'country', 'Poland'),
      'netherlands': calculate(data, name, unique_key[1], 'country', 'Brazil'),
      'italy': calculate(data, name, unique_key[1], 'country', 'Italy'),
      },

    'linux_prof_dev': calculate(data, name, unique_key[1], 'op_sys', 'Linux', True, 'main_branch', 'developer by profession', True),
    'mac_os_prof_dev' : calculate(data, name, unique_key[1], 'op_sys', 'MacOS', True, 'main_branch', 'developer by profession', True),
    'windows_prof_dev': calculate(data, name, unique_key[1], 'op_sys', 'Windows', True, 'main_branch', 'developer by profession', True),
    'linux_others': calculate(data, name, unique_key[1], 'op_sys', 'Linux', True, 'main_branch', 'developer by profession', False),
    'mac_os_others' : calculate(data, name, unique_key[1], 'op_sys', 'MacOS', True, 'main_branch', 'developer by profession', False),
    'windows_others': calculate(data, name, unique_key[1], 'op_sys', 'Windows', True, 'main_branch', 'developer by profession', False),
  }


def convert(file):
  start_time = time.time()
  try:
    # Reading data
    print('Reading data..')
    data, data_keys = read_data(file)
    keys = Keys(data_keys)

    # Creating lists
    print('Creating lists..')
    languages = select_list(data, keys.languages)
    databases = select_list(data, keys.databases)
    platforms = select_list(data, keys.platforms)
    webframes = select_list(data, keys.webframes)

    # Creating dicts
    print('Creating dicts..')
    languages_set = list(map(lambda item: dict(data, item, keys.languages, 'languages') ,languages))
    # print('lang set ->', languages_set)
    databases_set = list(map(lambda item: dict(data, item, keys.databases, 'databases') ,databases))
    platforms_set = list(map(lambda item: dict(data, item, keys.platforms, 'platforms') ,platforms))
    webframes_set = list(map(lambda item: dict(data, item, keys.webframes, 'webframes') ,webframes))
    # print(languages_set[0].keys())
  
    # Merging lists
    print('Merging lists..')
    data_set = languages_set + databases_set + platforms_set + webframes_set

    # Saving as json
    print('Converting to json..')
    with open('data.json', 'w') as data_file:
        json.dump(data_set, data_file)
    
    # Time record
    print('Data converted successfully!')
  except:
    print('Something went wrong.')
  print("--- time: %s seconds" % (time.time() - start_time))

convert('survey_results_public.csv')

# def calculate_devs(data, name, key):
#   sum = 0
#   for line in data:
#     if name in line[key]:
#       sum += 1
#     else:
#       next
#   return sum


# def total_devs(file):
#   print('Reading data..')
#   data, data_keys = read_data(file)
#   prof_devs = calculate_devs(data, 'developer by profession', 'main_branch')
#   all_devs = calculate_devs(data, '', 'main_branch')
#   not_prof = all_devs - prof_devs
#   print('prof:', prof_devs)
#   print('all:', all_devs)
#   print('not_prof:', not_prof)


# total_devs('survey_results_public.csv')