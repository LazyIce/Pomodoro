import time
import unittest
from utils.myselenium import MySelenium
from utils.config import Config
from utils.log import logger
from utils.generator import *
from utils.scripts import *
from selenium.webdriver.support.ui import Select
import re

class TestReport(unittest.TestCase):

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
        make_a_session_switch_to_report(self)
        time.sleep(1)

        driver = self.driver
        Select(driver.find_element_by_id("select_project")).select_by_visible_text(self.project_name)
 
        from_input = driver.find_element_by_xpath("//div[label[contains(text(), 'From')]]/div/div/input")
        to_input = driver.find_element_by_xpath("//div[label[contains(text(), 'To')]]/div/div/input")

        to_time = to_input.get_attribute('value')
        pattern = "\s(.*),"
        day = re.search(pattern, to_time).group(1)
        prev_day = ' '+str(int(day)-1)
        from_time = re.sub(pattern, prev_day, to_time)
        
        from_input.send_keys("1")
        from_input.clear()

        from_input.send_keys(from_time)

    def tearDown(self):
        self.driver.close()

    def test_both_checked(self):
        driver = self.driver

        driver.find_element_by_id('get_report').click()
        time.sleep(1)

        # Assert we have a 'Total pomodorods completed' number
        xpath = "//p[strong[contains(text(), 'Total Pomodoros Completed')]]"
        self.check_this_element_valid(xpath)

        # Assert we have a 'Total hours worked' number
        xpath = "//p[strong[contains(text(), 'Total Hours Worked')]]"
        self.check_this_element_valid(xpath)

    def test_total_hours_unchecked(self):
        driver = self.driver
        driver.find_element_by_xpath("//label[contains(text(), 'Included total hours worked')]").click()
        driver.find_element_by_id('get_report').click()
        time.sleep(1)

        # Assert we have a 'Total pomodorods completed' number
        xpath = "//p[strong[contains(text(), 'Total Pomodoros Completed')]]"
        self.check_this_element_valid(xpath)

        # Assert we have a 'Total hours worked' number
        xpath = "//p[strong[contains(text(), 'Total Hours Worked')]]"
        self.check_this_element_not_exist(xpath)


    def test_completed_pomodoros_unchecked(self):
        driver = self.driver
        driver.find_element_by_xpath("//label[contains(text(), 'Included completed pomodoros')]").click()
        driver.find_element_by_id('get_report').click()
        time.sleep(1)

        # Assert we have a 'Total pomodorods completed' number
        xpath = "//p[strong[contains(text(), 'Total Pomodoros Completed')]]"
        self.check_this_element_not_exist(xpath)

        # Assert we have a 'Total hours worked' number
        xpath = "//p[strong[contains(text(), 'Total Hours Worked')]]"
        self.check_this_element_valid(xpath)

    def test_both_unchecked(self):
        driver = self.driver
        driver.find_element_by_xpath("//label[contains(text(), 'Included total hours worked')]").click()
        driver.find_element_by_xpath("//label[contains(text(), 'Included completed pomodoros')]").click()
        driver.find_element_by_id('get_report').click()
        time.sleep(1)

        # Assert we have a 'Total pomodorods completed' number
        xpath = "//p[strong[contains(text(), 'Total Pomodoros Completed')]]"
        self.check_this_element_not_exist(xpath)

        # Assert we have a 'Total hours worked' number
        xpath = "//p[strong[contains(text(), 'Total Hours Worked')]]"
        self.check_this_element_not_exist(xpath)

    def check_this_element_valid(self, xpath):
        driver = self.driver
        self.assertTrue(self.selenium.is_element_exist('xpath', xpath))
        a  = driver.find_element_by_xpath(xpath)
        b = a.text
        pattern = ":\s(.*)"
        number = int(re.search(pattern, b).group(1))
        self.assertEqual(type(number), int)

    def check_this_element_not_exist(self, xpath):
        driver = self.driver
        self.assertFalse(self.selenium.is_element_exist('xpath', xpath))