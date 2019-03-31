import unittest
from utils.myselenium import MySelenium
from utils.config import Config
from utils.log import logger
from utils.generator import *
from utils.scripts import *

import time


class UseCases1():
    """
        Test first set of use cases
        Login as admin
        Add a new user
        Add an user with existing email
    """

    def __init__(self):
        pass
        # self.selenium = MySelenium('Chrome')
        # self.driver = self.selenium.driver
        # self.base_url = Config().get('URL')
        # Variables
        # self.user_first_name = random_name()
        # self.user_last_name = random_name()
        # self.user_email = random_email()
        # admin_create_new_user_logout(self)


    def test_admin_login(self):
        """
            See if switched to dashboard when login as admin
        """
        driver = self.driver
        driver.get(self.basename+"/login")
        # Find input box with "Enter your admin name" as placeholder
        username_input = driver.find_element_by_xpath("//input[contains(@placeholder, 'Enter your admin name')]")
        # check "name" field of this element
        print(username_input.get_attribute("name"))

        # find submit button
        submit_button = driver.find_element_by_xpath("//button[contains(@type, 'submit')]")
        # check text of this element
        print(submit_button.text)
        
        # type "admin" into username_input
        username_input.send_keys("admin")
        print(username_input.get_attribute("value"))

        # click "submit" button
        submit_button.click()

        # Find "Here is list of users for admin"
        p = driver.find_element_by_xpath("//p[contains(@class, 'category')]")
        print(p.text)


    def test_add_new_user(self):
        """
            Test add a new user
        """
        driver = self.driver

        # Click create new user button to show modal
        create_new_user_button = driver.find_element_by_id("create_new_user_button")
        create_new_user_button.click()

        # Check CreateModal is pop up

        # Type in firstname lastname email
        create_first_name = driver.find_element_by_id("create_first_name")
        create_last_name = driver.find_element_by_id("create_last_name")
        create_emal = driver.find_element_by_id("create_email")

        # first_name = "Bruce"
        # last_name = "Lee"
        # email = "bruce.lee@gmail.com"
        
        first_name = random_first_name()
        last_name = random_last_name()
        email = random_email()
        
        create_first_name.send_keys(first_name)
        create_last_name.send_keys(last_name)
        create_emal.send_keys(email)

        # click "create" button
        confirm_create_new_user_button = driver.find_element_by_id("confirm_create_new_user_button")
        confirm_create_new_user_button.click()

        # look for the user just generated
        new_user_td1 = driver.find_element_by_xpath("//tr[//td[contains(text(), '{}')]]".format(first_name))
        new_user_td2 = driver.find_element_by_xpath("//tr[//td[contains(text(), '{}')]]".format(last_name))
        new_user_td3 = driver.find_element_by_xpath("//tr[//td[contains(text(), '{}')]]".format(email))

        print(new_user_td1)
        print(new_user_td2)
        print(new_user_td3)


    def test_admin_add_user_with_existing_user(self):
        """
            Test add another user with same email but different name
        """
        driver = self.driver

        # Click create new user button to show modal
        create_new_user_button = driver.find_element_by_id("create_new_user_button")
        create_new_user_button.click()

        # Check CreateModal is pop up

        # Type in firstname lastname email
        create_first_name = driver.find_element_by_id("create_first_name")
        create_last_name = driver.find_element_by_id("create_last_name")
        create_emal = driver.find_element_by_id("create_email")

        # first_name = "Bruce"
        # last_name = "Lee"
        # email = "bruce.lee@gmail.com"
        
        first_name = random_first_name()
        last_name = random_last_name()
        email = random_email()
        
        create_first_name.send_keys(first_name)
        create_last_name.send_keys(last_name)
        create_emal.send_keys(email)

        # click "create" button
        confirm_create_new_user_button = driver.find_element_by_id("confirm_create_new_user_button")
        confirm_create_new_user_button.click()

        # look for the user just generated
        new_user_td1 = driver.find_element_by_xpath("//tr[//td[contains(text(), '{}')]]".format(first_name))
        new_user_td2 = driver.find_element_by_xpath("//tr[//td[contains(text(), '{}')]]".format(last_name))
        new_user_td3 = driver.find_element_by_xpath("//tr[//td[contains(text(), '{}')]]".format(email))

        print(new_user_td1)
        print(new_user_td2)
        print(new_user_td3)


        driver = self.driver

        # Click create new user button to show modal
        create_new_user_button = driver.find_element_by_id("create_new_user_button")
        create_new_user_button.click()

        # Check CreateModal is pop up

        # Type in firstname lastname email
        create_first_name = driver.find_element_by_id("create_first_name")
        create_last_name = driver.find_element_by_id("create_last_name")
        create_emal = driver.find_element_by_id("create_email")

        # first_name = "Bruce"
        # last_name = "Lee"
        # email = "bruce.lee@gmail.com"
        
        first_name = random_first_name()
        last_name = random_last_name()
        email = random_email()
        
        create_first_name.send_keys(first_name)
        create_last_name.send_keys(last_name)
        create_emal.send_keys(email)

        # click "create" button
        confirm_create_new_user_button = driver.find_element_by_id("confirm_create_new_user_button")
        confirm_create_new_user_button.click()

        # look for the user just generated
        new_user_td1 = driver.find_element_by_xpath("//tr[//td[contains(text(), '{}')]]".format(first_name))
        new_user_td2 = driver.find_element_by_xpath("//tr[//td[contains(text(), '{}')]]".format(last_name))
        new_user_td3 = driver.find_element_by_xpath("//tr[//td[contains(text(), '{}')]]".format(email))

        print(new_user_td1)
        print(new_user_td2)
        print(new_user_td3)

    def add_new_project(self):
        self.user_first_name = random_first_name()
        self.user_last_name = random_last_name()
        self.user_email = random_email()
        self.project_name = random_project_name()


        self.selenium = MySelenium('Chrome')
        self.base_url = Config().get('URL')
        self.driver = self.selenium.driver

        admin_create_new_user_logout(self)
        login_as_user(self)

        driver = self.driver

        # Click create new user button to show modal
        create_project_button = driver.find_element_by_id("create_project_button")
        create_project_button.click()

        # Check CreateModal is pop up
        create_modal = self.selenium.is_element_exist("id", "create_project_modal")

        # Type in project name
        create_project_name = driver.find_element_by_id("create_project_name")

        name = self.project_name

        create_project_name.send_keys(name)

        # click "create" button
        confirm_create_project_button = driver.find_element_by_id("confirm_create_project_button")
        confirm_create_project_button.click()

        # look for the user just generated
        new_project_name = self.selenium.is_element_exist("xpath", "//tr[td[contains(text(), '{}')]]".format(name))
        



    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    a = UseCases1()
    # a.test_add_new_user()
    # a.test_admin_add_user_with_existing_user()
    a.add_new_project()