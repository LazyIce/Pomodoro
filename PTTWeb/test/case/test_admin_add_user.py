import unittest
import time
from utils.myselenium import MySelenium
from utils.config import Config
from utils.log import logger
from utils.generator import *

class TestAdminAddUser(unittest.TestCase):

    def setUp(self):
        self.selenium = MySelenium('Chrome')
        self.base_url = Config().get('URL')
        self.driver = self.selenium.driver
        self.driver.get(self.base_url + "/login")
        self.driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/div/input").send_keys("admin")
        self.driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/button").click()
    
    def tearDown(self):
        self.driver.close()

    def test_admin_add_new_user_with_non_exist_user(self):
        driver = self.driver

        # Click create new user button to show modal
        create_new_user_button = driver.find_element_by_id("create_new_user_button")
        create_new_user_button.click()

        # Check CreateModal is pop up
        create_modal = self.selenium.is_element_exist("id", "create_modal")
        self.assertTrue(create_modal)

        # Type in firstname lastname email
        create_first_name = driver.find_element_by_id("create_first_name")
        create_last_name = driver.find_element_by_id("create_last_name")
        create_emal = driver.find_element_by_id("create_email")

        first_name = random_first_name()
        last_name = random_last_name()
        email = random_email()

        create_first_name.send_keys(first_name)
        create_last_name.send_keys(last_name)
        create_emal.send_keys(email)

        # click "create" button
        confirm_create_new_user_button = driver.find_element_by_id("confirm_create_new_user_button")
        confirm_create_new_user_button.click()
        time.sleep(1)

        # look for the user just generated
        new_user_email = self.selenium.is_element_exist("xpath", "//tr[td[contains(text(), '{}')]]".format(email))
        self.assertTrue(new_user_email)
        
        if new_user_email:
            new_user_first_name = driver.find_element("xpath", "//tr[td[contains(text(), '{}')]]/td[2]".format(email)).text
            new_user_last_name = driver.find_element("xpath", "//tr[td[contains(text(), '{}')]]/td[3]".format(email)).text
            self.assertEqual(new_user_first_name, first_name)
            self.assertEqual(new_user_last_name, last_name)


    def test_admin_add_user_with_exist_user(self):
        driver = self.driver

        # Click create new user button to show modal
        create_new_user_button = driver.find_element_by_id("create_new_user_button")
        create_new_user_button.click()

        # Check CreateModal is pop up
        create_modal = self.selenium.is_element_exist("id", "create_modal")
        self.assertTrue(create_modal)

        # Type in firstname lastname email
        create_first_name = driver.find_element_by_id("create_first_name")
        create_last_name = driver.find_element_by_id("create_last_name")
        create_emal = driver.find_element_by_id("create_email")

        first_name = random_first_name()
        last_name = random_last_name()
        email = random_email()

        create_first_name.send_keys(first_name)
        create_last_name.send_keys(last_name)
        create_emal.send_keys(email)

        # confirm create
        confirm_create_new_user_button = driver.find_element_by_id("confirm_create_new_user_button")
        confirm_create_new_user_button.click()

        # Click create new user button to add the same user again
        time.sleep(2)
        create_new_user_button = driver.find_element_by_id("create_new_user_button")
        create_new_user_button.click()

        # Check CreateModal is pop up
        create_modal = self.selenium.is_element_exist("id", "create_modal")
        self.assertTrue(create_modal)

        # Type in firstname lastname email
        create_first_name = driver.find_element_by_id("create_first_name")
        create_last_name = driver.find_element_by_id("create_last_name")
        create_emal = driver.find_element_by_id("create_email")

        create_first_name.send_keys(first_name)
        create_last_name.send_keys(last_name)
        create_emal.send_keys(email)

        # confirm create
        confirm_create_new_user_button = driver.find_element_by_id("confirm_create_new_user_button")
        confirm_create_new_user_button.click()

        # check alert
        is_error_modal = self.selenium.is_element_exist("id", "error_modal")
        self.assertTrue(is_error_modal)
        if is_error_modal:
            error_modal = driver.find_element_by_id("error_modal")
            error_msg = driver.find_element_by_xpath("//div[@id='error_modal']/div/div[2]").text
            self.assertEqual(error_msg, "Request failed with status code 409")

