import time
import unittest
from utils.myselenium import MySelenium
from utils.config import Config
from utils.log import logger
from utils.generator import *
from utils.scripts import *


class TestUserDeleteProject(unittest.TestCase):

    def setUp(self):
        self.selenium = MySelenium('Chrome')
        self.driver = self.selenium.driver
        self.base_url = Config().get('URL')
        # Variables
        self.first_name = random_first_name()
        self.last_name = random_last_name()
        self.email = random_email()
        self.project_name = random_project_name()

    def tearDown(self):
        self.driver.close()

    def test_user_delete_project_without_sessions(self):
        driver = self.driver

        # create a new user
        self.driver.get(self.base_url + "/login")
        self.driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/div/input").send_keys("admin")
        self.driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/button").click()
        time.sleep(1)

        create_new_user_button = driver.find_element_by_id("create_new_user_button")
        create_new_user_button.click()

        create_first_name = driver.find_element_by_id("create_first_name")
        create_last_name = driver.find_element_by_id("create_last_name")
        create_emal = driver.find_element_by_id("create_email")

        create_first_name.send_keys(self.first_name)
        create_last_name.send_keys(self.last_name)
        create_emal.send_keys(self.email)

        confirm_create_new_user_button = driver.find_element_by_id("confirm_create_new_user_button")
        confirm_create_new_user_button.click()
        logger.info("create a user for deleting")
        time.sleep(1)
        driver.find_element_by_id("logout").click()
        time.sleep(1)

        # create a project with this user
        driver.find_element_by_link_text("User").click()
        time.sleep(1)
        driver.find_element("xpath", "//div[@id='login-tabpane-user']/form/div/input").send_keys(self.email)
        driver.find_element("xpath", "//div[@id='login-tabpane-user']/form/button").click()
        time.sleep(1)
        driver.find_element_by_id("create_project_button").click()
        driver.find_element_by_id("create_project_name").send_keys(self.project_name)
        driver.find_element_by_id("confirm_create_project_button").click()
        logger.info("create a project for the user")
        time.sleep(1)

        # delete the created project
        delete_button = driver.find_element("xpath", "//tr[td[contains(text(), '{}')]]/td[5]/button[2]".format(self.project_name))
        delete_button.click()
        logger.info("click the delete button")
        time.sleep(1)

        # Check delete modal doesn't pop up
        is_delete_modal = self.selenium.is_element_exist("id", "delete_modal")
        self.assertFalse(is_delete_modal)
        logger.info("delete modal doesn't pop up")

        # Check delete success
        is_project = self.selenium.is_element_exist("xpath", "//tr[td[contains(text(), '{}')]]".format(self.project_name))
        self.assertFalse(is_project)
        logger.info("delete the user successfully")

    def test_user_delete_project_with_sessions_confirm(self):
        driver = self.driver

        # create a new user
        self.driver.get(self.base_url + "/login")
        self.driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/div/input").send_keys("admin")
        self.driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/button").click()
        time.sleep(1)

        create_new_user_button = driver.find_element_by_id("create_new_user_button")
        create_new_user_button.click()

        create_first_name = driver.find_element_by_id("create_first_name")
        create_last_name = driver.find_element_by_id("create_last_name")
        create_emal = driver.find_element_by_id("create_email")

        create_first_name.send_keys(self.first_name)
        create_last_name.send_keys(self.last_name)
        create_emal.send_keys(self.email)

        confirm_create_new_user_button = driver.find_element_by_id("confirm_create_new_user_button")
        confirm_create_new_user_button.click()
        logger.info("create a user for deleting")
        time.sleep(1)
        driver.find_element_by_id("logout").click()
        time.sleep(1)

        # create a project with this user
        driver.find_element_by_link_text("User").click()
        time.sleep(1)
        driver.find_element("xpath", "//div[@id='login-tabpane-user']/form/div/input").send_keys(self.project_name)
        driver.find_element("xpath", "//div[@id='login-tabpane-user']/form/button").click()
        time.sleep(1)
        driver.find_element_by_id("create_project_button").click()
        driver.find_element_by_id("create_project_name").send_keys(self.project_name)
        driver.find_element_by_id("confirm_create_project_button").click()
        logger.info("create a project for the user")
        time.sleep(1)

        # create a session with this project
        # since we haven't implement this function yet, we will skip it and write the logic for the remaining test cases

        # delete the created project
        delete_button = driver.find_element("xpath", "//tr[td[contains(text(), '{}')]]/td[5]/button[2]".format(self.project_name))
        delete_button.click()
        logger.info("click the delete button")
        time.sleep(1)

        # Check delete modal pops up
        is_delete_modal = self.selenium.is_element_exist("id", "delete_modal")
        self.assertTrue(is_delete_modal)
        logger.info("delete modal doesn't pop up")

        # click confirm
        confirm_delete_button = driver.find_element_by_id("confirm_delete")
        confirm_delete_button.click()
        logger.info("click the confirm button")
        time.sleep(1)

        # Check delete success
        is_project = self.selenium.is_element_exist("xpath", "//tr[td[contains(text(), '{}')]]".format(self.project_name))
        self.assertFalse(is_project)
        logger.info("delete the user successfully")

    def test_user_delete_project_with_sessions_not_confirm(self):
        driver = self.driver

        # create a new user
        self.driver.get(self.base_url + "/login")
        self.driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/div/input").send_keys("admin")
        self.driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/button").click()
        time.sleep(1)

        create_new_user_button = driver.find_element_by_id("create_new_user_button")
        create_new_user_button.click()

        create_first_name = driver.find_element_by_id("create_first_name")
        create_last_name = driver.find_element_by_id("create_last_name")
        create_emal = driver.find_element_by_id("create_email")

        create_first_name.send_keys(self.first_name)
        create_last_name.send_keys(self.last_name)
        create_emal.send_keys(self.email)

        confirm_create_new_user_button = driver.find_element_by_id("confirm_create_new_user_button")
        confirm_create_new_user_button.click()
        logger.info("create a user for deleting")
        time.sleep(1)
        driver.find_element_by_id("logout").click()
        time.sleep(1)

        # create a project with this user
        driver.find_element_by_link_text("User").click()
        time.sleep(1)
        driver.find_element("xpath", "//div[@id='login-tabpane-user']/form/div/input").send_keys(self.email)
        driver.find_element("xpath", "//div[@id='login-tabpane-user']/form/button").click()
        time.sleep(1)
        driver.find_element_by_id("create_project_button").click()
        driver.find_element_by_id("create_project_name").send_keys(self.project_name)
        driver.find_element_by_id("confirm_create_project_button").click()
        logger.info("create a project for the user")
        time.sleep(1)

        # create a session with this project
        # since we haven't implement this function yet, we will skip it and write the logic for the remaining test cases

        # delete the created project
        delete_button = driver.find_element("xpath", "//tr[td[contains(text(), '{}')]]/td[5]/button[2]".format(self.project_name))
        delete_button.click()
        logger.info("click the delete button")
        time.sleep(1)

        # Check delete modal pops up
        is_delete_modal = self.selenium.is_element_exist("id", "delete_modal")
        self.assertTrue(is_delete_modal)
        logger.info("delete modal doesn't pop up")

        # click cancel
        cancel_delete_button = driver.find_element("xpath", "//*[@id='delete_modal']/div/div[3]/button[1]")
        cancel_delete_button.click()
        logger.info("click the cancel button")
        time.sleep(1)

        # Check delete success
        is_project = self.selenium.is_element_exist("xpath", "//tr[td[contains(text(), '{}')]]".format(self.project_name))
        self.assertTrue(is_project)
        logger.info("cancel deleting the project")


