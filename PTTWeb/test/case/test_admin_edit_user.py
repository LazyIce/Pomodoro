import time
import unittest
from utils.myselenium import MySelenium
from utils.config import Config
from utils.log import logger
from utils.generator import *

class TestAdminEditUser(unittest.TestCase):
    def setUp(self):
        self.selenium = MySelenium('Chrome')
        self.driver = self.selenium.driver
        self.base_url = Config().get('URL')
        self.driver.get(self.base_url + "/login")
        self.driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/div/input").send_keys("admin")
        self.driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/button").click()

    def tearDown(self):
        self.driver.close()

    def test_admin_edit_user(self):
        driver = self.driver

        # create a new user
        create_new_user_button = driver.find_element_by_id("create_new_user_button")
        create_new_user_button.click()

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

        # edit the created user
        self.selenium.element_wait("xpath", "//tr[td[contains(text(), '{}')]]/td[6]/button[1]".format(email))
        time.sleep(1)
        edit_button = driver.find_element("xpath", "//tr[td[contains(text(), '{}')]]/td[6]/button[1]".format(email))
        edit_button.click()

        # Check CreateModal is pop up
        is_eidt_modal = self.selenium.is_element_exist("id", "edit_modal")
        self.assertTrue(is_eidt_modal)

        # Type in new firstname and new lastname
        edit_first_name = driver.find_element_by_id("edit_first_name")
        edit_last_name = driver.find_element_by_id("edit_last_name")

        modified_first_name = random_first_name()
        modified_last_name = random_last_name()

        edit_first_name.clear()
        edit_first_name.send_keys(modified_first_name)
        edit_last_name.clear()
        edit_last_name.send_keys(modified_last_name)

        # click confirm button
        confirm_edit_button = driver.find_element_by_id("confirm_edit")
        confirm_edit_button.click()

        # look for the user just modified
        self.selenium.element_wait("xpath", "//tr[td[contains(text(), '{}')]]".format(email))
        editted_first_name = driver.find_element("xpath", "//tr[td[contains(text(), '{}')]]/td[2]".format(email)).text
        editted_last_name = driver.find_element("xpath", "//tr[td[contains(text(), '{}')]]/td[3]".format(email)).text

        self.assertEqual(editted_first_name, modified_first_name)
        self.assertEqual(editted_last_name, modified_last_name)
