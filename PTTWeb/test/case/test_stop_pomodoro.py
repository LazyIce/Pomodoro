import time
import unittest
from utils.myselenium import MySelenium
from utils.config import Config
from utils.log import logger
from utils.generator import *
from utils.scripts import *
from selenium.webdriver.support.ui import Select


class TestStopPomodoro(unittest.TestCase):

    def setUp(self):
        self.selenium = MySelenium('Chrome')
        self.driver = self.selenium.driver
        self.base_url = Config().get('URL')
        # Variables
        self.user_first_name = random_first_name()
        self.user_last_name = random_last_name()
        self.user_email = random_email()
        self.project_name = random_project_name()

        admin_create_new_user_logout(self)
        login_as_user(self)
        user_add_project(self)
        time.sleep(1)

    def tearDown(self):
        self.driver.close()

    def test_stop_pomodoro_associate_no_log(self):
        driver = self.driver
        start_associated_pomodoro(self)
        time.sleep(1)
        
        # Click "Stop current ongoing Pomodoro"
        driver.find_element_by_id("stop_pomodoro_button").click()
        # Make sure stop modal pops up
        self.assertTrue(self.selenium.is_element_exist("id", "stop_pomodoro_button"))

        # Click no, go to project, check session incremented but total pomodoro not incremented
        driver.find_element_by_id("stop_cancel_button").click()
        time.sleep(1)

        # Check for states
        div_inactive = driver.find_element_by_xpath("//div[contains(text(), 'inactive')]")
        div_working = driver.find_element_by_xpath("//div[contains(text(), 'Working')]")
        div_break = driver.find_element_by_xpath("//div[contains(text(), 'Taking a break')]")

        self.assertEqual(div_inactive.value_of_css_property('background-color'), 'rgba(173, 216, 230, 1)')
        self.assertEqual(div_working.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')
        self.assertEqual(div_break.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')

        driver.find_element_by_id("sidebar_user_Projects").click()
        project_entry = driver.find_element_by_xpath("//tr[td[contains(text(), '{}')]]".format(self.project_name))
        self.assertEqual(project_entry.find_element_by_xpath("td[3]").text, '1')
        self.assertEqual(project_entry.find_element_by_xpath("td[4]").text, '0')
    
    def test_stop_pomodoro_associate_do_log(self):
        driver = self.driver
        start_associated_pomodoro(self)
        time.sleep(1)
        
        # Click "Stop current ongoing Pomodoro"
        driver.find_element_by_id("stop_pomodoro_button").click()
        # Make sure stop modal pops up
        self.assertTrue(self.selenium.is_element_exist("id", "stop_pomodoro_button"))

        # Click no, go to project, check session incremented but total pomodoro not incremented
        driver.find_element_by_id("stop_confirm_button").click()
        time.sleep(1)

        # Check for states
        div_inactive = driver.find_element_by_xpath("//div[contains(text(), 'inactive')]")
        div_working = driver.find_element_by_xpath("//div[contains(text(), 'Working')]")
        div_break = driver.find_element_by_xpath("//div[contains(text(), 'Taking a break')]")

        self.assertEqual(div_inactive.value_of_css_property('background-color'), 'rgba(173, 216, 230, 1)')
        self.assertEqual(div_working.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')
        self.assertEqual(div_break.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')

        # Click yes, go to project, check both session and total pomodoros imcremented
        driver.find_element_by_id("sidebar_user_Projects").click()
        project_entry = driver.find_element_by_xpath("//tr[td[contains(text(), '{}')]]".format(self.project_name))
        self.assertEqual(project_entry.find_element_by_xpath("td[3]").text, '1')
        self.assertEqual(project_entry.find_element_by_xpath("td[4]").text, '1')

    def test_stop_pomodoro_not_associated(self):
        driver = self.driver
        start_not_associated_pomodoro(self)
        time.sleep(1)

         # Click "Stop current ongoing Pomodoro"
        driver.find_element_by_id("stop_pomodoro_button").click()
        # Make sure stop modal pops up
        self.assertTrue(self.selenium.is_element_exist("id", "stop_pomodoro_button"))

        # Click no, go to project, check session incremented but total pomodoro not incremented
        driver.find_element_by_id("stop_confirm_button").click()
        time.sleep(1)

        # Check for states
        div_inactive = driver.find_element_by_xpath("//div[contains(text(), 'inactive')]")
        div_working = driver.find_element_by_xpath("//div[contains(text(), 'Working')]")
        div_break = driver.find_element_by_xpath("//div[contains(text(), 'Taking a break')]")

        self.assertEqual(div_inactive.value_of_css_property('background-color'), 'rgba(173, 216, 230, 1)')
        self.assertEqual(div_working.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')
        self.assertEqual(div_break.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')

        # Click yes, go to project, check both session and total pomodoros not imcremented
        driver.find_element_by_id("sidebar_user_Projects").click()
        project_entry = driver.find_element_by_xpath("//tr[td[contains(text(), '{}')]]".format(self.project_name))
        self.assertEqual(project_entry.find_element_by_xpath("td[3]").text, '0')
        self.assertEqual(project_entry.find_element_by_xpath("td[4]").text, '0')
