import time
import unittest
from utils.myselenium import MySelenium
from utils.config import Config
from utils.log import logger
from utils.generator import *


class TestAdminDeleteUser(unittest.TestCase):

    def setUp(self):
        self.selenium = MySelenium('Chrome')
        self.driver = self.selenium.driver
        self.base_url = Config().get('URL')
        self.driver.get(self.base_url + "/login")
        self.driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/div/input").send_keys("admin")
        self.driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/button").click()

    def tearDown(self):
        self.driver.close()

    def test_admin_delete_user_without_projects(self):
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

        confirm_create_new_user_button = driver.find_element_by_id("confirm_create_new_user_button")
        confirm_create_new_user_button.click()

        # delete the created user
        self.selenium.element_wait("xpath", "//tr[td[contains(text(), '{}')]]/td[6]/button[2]".format(email))
        time.sleep(1)
        delete_button = driver.find_element("xpath", "//tr[td[contains(text(), '{}')]]/td[6]/button[2]".format(email))
        delete_button.click()

        # Check delete modal is not pop up
        is_delete_modal = self.selenium.is_element_exist("id", "delete_modal")
        self.assertFalse(is_delete_modal)

        # Check delete success
        is_email = self.selenium.is_element_exist("xpath", "//tr[td[contains(text(), '{}')]]".format(email))
        self.assertFalse(is_email)

    def test_admin_delete_user_with_projects_confirm(self):
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

        confirm_create_new_user_button = driver.find_element_by_id("confirm_create_new_user_button")
        confirm_create_new_user_button.click()
        time.sleep(1)
        driver.find_element_by_id("logout").click()

        # create a project with this user
        time.sleep(1)
        driver.find_element_by_link_text("User")
        driver.find_element("xpath", "//div[@id='login-tabpane-user']/form/div/input").send_keys(email)
        driver.find_element("xpath", "//div[@id='login-tabpane-user']/form/button").click()
        time.sleep(1)
        driver.find_element_by_id("create_project_button").click()
        project_name = random_project_name()
        driver.find_element_by_id("create_project_name").send_keys(project_name)
        driver.find_element_by_id("confirm_create_project_button").click()
        time.sleep(1)
        driver.find_element_by_id("logout").click()

        # delete the created user
        time.sleep(1)
        driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/div/input").send_keys("admin")
        driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/button").click()
        time.sleep(1)
        delete_button = driver.find_element("xpath", "//tr[td[contains(text(), '{}')]]".format(email))
        delete_button.click()

        # Check delete modal is pop up
        is_delete_modal = self.selenium.is_element_exist("id", "delete_modal")
        self.assertTrue(is_delete_modal)

        # click confirm
        confirm_delete_button = driver.find_element_by_id("confirm_delete")
        confirm_delete_button.click()

        # Check delete success
        is_email = self.selenium.is_element_exist("xpath", "//tr[td[contains(text(), '{}')]]".format(email))
        self.assertFalse(is_email)

    def test_admin_delete_user_with_projects_not_confirm(self):
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

        confirm_create_new_user_button = driver.find_element_by_id("confirm_create_new_user_button")
        confirm_create_new_user_button.click()
        time.sleep(1)
        driver.find_element_by_id("logout").click()

        # create a project with this user
        time.sleep(1)
        driver.find_element_by_link_text("User")
        driver.find_element("xpath", "//div[@id='login-tabpane-user']/form/div/input").send_keys(email)
        driver.find_element("xpath", "//div[@id='login-tabpane-user']/form/button").click()
        time.sleep(1)
        driver.find_element_by_id("create_project_button").click()
        project_name = random_project_name()
        driver.find_element_by_id("create_project_name").send_keys(project_name)
        driver.find_element_by_id("confirm_create_project_button").click()
        time.sleep(1)
        driver.find_element_by_id("logout").click()

        # delete the created user
        time.sleep(1)
        driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/div/input").send_keys("admin")
        driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/button").click()
        time.sleep(1)
        delete_button = driver.find_element("xpath", "//tr[td[contains(text(), '{}')]]".format(email))
        delete_button.click()

        # Check delete modal is pop up
        is_delete_modal = self.selenium.is_element_exist("id", "delete_modal")
        self.assertTrue(is_delete_modal)

        # click cancel
        cancel_delete_button = driver.find_element("xpath", "//*[@id='delete_modal']/div/div[3]/button[1]")
        cancel_delete_button.click()

        # Check delete is cancelled
        is_email = self.selenium.is_element_exist("xpath", "//tr[td[contains(text(), '{}')]]".format(email))
        self.assertTrue(is_email)


