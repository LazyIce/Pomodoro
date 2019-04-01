"""
    This file contains repetitive procedural scripts that perform certain sequence of actions
    that are necessary for a unittest but too ugly to be in those files 
"""

import time

def admin_create_new_user_logout(obj):
    """
        Login to admin
        Create a new random user using information in the unitest object
        Logout
    """

    # Admin login
    driver = obj.driver
    driver.get(obj.base_url + "/login")
    username_input = driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/div/input")
    placeholder = username_input.get_attribute('placeholder')
    username_input.send_keys("admin")
    submit_button = driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/button")
    submit_button.click()
    # Add a new user
    create_new_user_button = driver.find_element_by_id("create_new_user_button")
    create_new_user_button.click()
    create_modal = obj.selenium.is_element_exist("id", "create_modal")
    create_first_name = driver.find_element_by_id("create_first_name")
    create_last_name = driver.find_element_by_id("create_last_name")
    create_emal = driver.find_element_by_id("create_email")
    create_first_name.send_keys(obj.user_first_name)
    create_last_name.send_keys(obj.user_last_name)
    create_emal.send_keys(obj.user_email)
    confirm_create_new_user_button = driver.find_element_by_id("confirm_create_new_user_button")
    confirm_create_new_user_button.click()
    # Log out from admin
    logout_button = driver.find_element_by_id("logout")
    time.sleep(1)
    logout_button.click()

def login_as_user(obj):
    """
        Just ... login as an user. Using information in the unittest object.
    """
    obj.driver.get(obj.base_url + "/login")
    obj.driver.find_element_by_link_text("User").click()
    obj.driver.find_element("xpath", "//div[@id='login-tabpane-user']/form/div/input").send_keys(obj.user_email)
    obj.driver.find_element("xpath", "//div[@id='login-tabpane-user']/form/button").click()


def user_add_project(obj, another_project_name=None):
    """
        Create a project
    """
    driver = obj.driver
    # Click create new user button to show modal
    create_project_button = driver.find_element_by_id("create_project_button")
    create_project_button.click()
    # Check CreateModal is pop up
    create_modal = obj.selenium.is_element_exist("id", "create_project_modal")
    # Type in project name
    create_project_name = driver.find_element_by_id("create_project_name")
    create_project_name.clear()
    if another_project_name == None:
        create_project_name.send_keys(obj.project_name)
    else:
        create_project_name.send_keys(another_project_name)
    # click "create" button
    confirm_create_project_button = driver.find_element_by_id("confirm_create_project_button")
    confirm_create_project_button.click()
    time.sleep(1)