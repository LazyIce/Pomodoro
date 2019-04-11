import time
import unittest
from utils.myselenium import MySelenium
from utils.config import Config
from utils.log import logger
from utils.generator import *
from utils.scripts import *
from selenium.webdriver.support.ui import Select


class TestStartPomodoro(unittest.TestCase):

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
        # time.sleep(1000)
        self.driver.close()

    def test_start_pomodoro_not_associate(self):
        driver = self.driver

        # Click on "Pomodoro" tab
        driver.find_element_by_id("sidebar_user_Pomodoro").click()

        # Check for states
        div_inactive = driver.find_element_by_xpath("//div[contains(text(), 'inactive')]")
        div_working = driver.find_element_by_xpath("//div[contains(text(), 'Working')]")
        div_break = driver.find_element_by_xpath("//div[contains(text(), 'Taking a break')]")

        self.assertEqual(div_inactive.value_of_css_property('background-color'), 'rgba(173, 216, 230, 1)')
        self.assertEqual(div_working.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')
        self.assertEqual(div_break.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')


        # Click on "Create a new pomodoro" button
        driver.find_element_by_id("create_pomodoro_button").click()
        # Type in 3 second pomodoro
        driver.find_element_by_id("create_second").send_keys(1)
        # Don't associate
        Select(driver.find_element_by_id("project_select_box")).select_by_visible_text("No association")
        # Confirm create pomodoro
        driver.find_element_by_id("create_confirm_button").click()

        # Check for states again
        self.assertEqual(div_inactive.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')
        self.assertEqual(div_working.value_of_css_property('background-color'), 'rgba(173, 216, 230, 1)')
        self.assertEqual(div_break.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')

        # Wait for continue modal, check for # of pomodoro = 1
        self.selenium.element_wait("id", "continue_cancel_button")
        pomodoro_count = driver.find_element_by_xpath("//div[div[contains(text(), '# of pomodoro completed')]]/div[2]")
        self.assertEqual(pomodoro_count.text, '1')

        # Check for states again
        self.assertEqual(div_inactive.value_of_css_property('background-color'), 'rgba(173, 216, 230, 1)')
        self.assertEqual(div_working.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')
        self.assertEqual(div_break.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')


    def test_start_pomodoro_associate(self):
        driver = self.driver

        # Check Sessions = 0, Total Pomodoros = 0
        project_entry = driver.find_element_by_xpath("//tr[td[contains(text(), '{}')]]".format(self.project_name))
        self.assertEqual(project_entry.find_element_by_xpath("td[3]").text, '0')
        self.assertEqual(project_entry.find_element_by_xpath("td[4]").text, '0')

        # Click on "Pomodoro" tab
        driver.find_element_by_id("sidebar_user_Pomodoro").click()

        # Check for states
        div_inactive = driver.find_element_by_xpath("//div[contains(text(), 'inactive')]")
        div_working = driver.find_element_by_xpath("//div[contains(text(), 'Working')]")
        div_break = driver.find_element_by_xpath("//div[contains(text(), 'Taking a break')]")

        self.assertEqual(div_inactive.value_of_css_property('background-color'), 'rgba(173, 216, 230, 1)')
        self.assertEqual(div_working.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')
        self.assertEqual(div_break.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')


        # Click on "Create a new pomodoro" button
        driver.find_element_by_id("create_pomodoro_button").click()
        # Type in 3 second pomodoro
        driver.find_element_by_id("create_second").send_keys(1)
        # Associate with current random project name
        Select(driver.find_element_by_id("project_select_box")).select_by_visible_text(self.project_name)
        # Confirm create pomodoro
        driver.find_element_by_id("create_confirm_button").click()

        # Check for states again
        self.assertEqual(div_inactive.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')
        self.assertEqual(div_working.value_of_css_property('background-color'), 'rgba(173, 216, 230, 1)')
        self.assertEqual(div_break.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')

        # Wait for continue modal, check for # of pomodoro = 1
        self.selenium.element_wait("id", "continue_cancel_button")
        pomodoro_count = driver.find_element_by_xpath("//div[div[contains(text(), '# of pomodoro completed')]]/div[2]")
        self.assertEqual(pomodoro_count.text, '1')

        # Check for states again
        self.assertEqual(div_inactive.value_of_css_property('background-color'), 'rgba(173, 216, 230, 1)')
        self.assertEqual(div_working.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')
        self.assertEqual(div_break.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')

        # Click No
        driver.find_element_by_id("continue_cancel_button").click()
        time.sleep(1)

        # Go back to project tab
        driver.find_element_by_id("sidebar_user_Projects").click()
        time.sleep(1)

        # Check Sessions and Total Pomodoros incremented
        project_entry = driver.find_element_by_xpath("//tr[td[contains(text(), '{}')]]".format(self.project_name))
        self.assertEqual(project_entry.find_element_by_xpath("td[3]").text, '1')
        self.assertEqual(project_entry.find_element_by_xpath("td[4]").text, '1')

    def test_start_pomodoro_associate_break_stop(self):
        driver = self.driver

        # Click on "Pomodoro" tab
        driver.find_element_by_id("sidebar_user_Pomodoro").click()
        # Click on "Create a new pomodoro" button
        driver.find_element_by_id("create_pomodoro_button").click()
        # Type in 1 second pomodoro and 1 second break
        driver.find_element_by_id("create_second").send_keys(1)
        driver.find_element_by_id("break_seconds").send_keys(1)
        # Associate with current random project name
        Select(driver.find_element_by_id("project_select_box")).select_by_visible_text(self.project_name)
        # Confirm create pomodoro
        driver.find_element_by_id("create_confirm_button").click()

        # Wait for continue modal
        self.selenium.element_wait("id", "continue_take_a_break")
        # Click Take a break
        driver.find_element_by_id("continue_take_a_break").click()
        
        # Check for states
        div_inactive = driver.find_element_by_xpath("//div[contains(text(), 'inactive')]")
        div_working = driver.find_element_by_xpath("//div[contains(text(), 'Working')]")
        div_break = driver.find_element_by_xpath("//div[contains(text(), 'Taking a break')]")

        self.assertEqual(div_inactive.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')
        self.assertEqual(div_working.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')
        self.assertEqual(div_break.value_of_css_property('background-color'), 'rgba(173, 216, 230, 1)')

        # Wait for continue modal again, check for # of pomodoro = 1
        time.sleep(1)
        self.selenium.element_wait("id", "continue_cancel_button")
        pomodoro_count = driver.find_element_by_xpath("//div[div[contains(text(), '# of pomodoro completed')]]/div[2]")

        # time.sleep(1000)
        self.assertEqual(pomodoro_count.text, '1')

        # Check for states again
        self.assertEqual(div_inactive.value_of_css_property('background-color'), 'rgba(173, 216, 230, 1)')
        self.assertEqual(div_working.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')
        self.assertEqual(div_break.value_of_css_property('background-color'), 'rgba(255, 255, 255, 1)')

        # Go back to project tab
        driver.find_element_by_id("continue_cancel_button").click()
        time.sleep(1)
        driver.find_element_by_id("sidebar_user_Projects").click()

        # Check Sessions and Total Pomodoros incremented
        project_entry = driver.find_element_by_xpath("//tr[td[contains(text(), '{}')]]".format(self.project_name))
        self.assertEqual(project_entry.find_element_by_xpath("td[3]").text, '1')
        self.assertEqual(project_entry.find_element_by_xpath("td[4]").text, '1')

    def test_start_pomodoro_associate_break_continue(self):
        driver = self.driver

        # Click on "Pomodoro" tab
        driver.find_element_by_id("sidebar_user_Pomodoro").click()
        # Click on "Create a new pomodoro" button
        driver.find_element_by_id("create_pomodoro_button").click()
        # Type in 1 second pomodoro and 1 second break
        driver.find_element_by_id("create_second").send_keys(1)
        driver.find_element_by_id("break_seconds").send_keys(1)
        # Associate with current random project name
        Select(driver.find_element_by_id("project_select_box")).select_by_visible_text(self.project_name)
        # Confirm create pomodoro
        driver.find_element_by_id("create_confirm_button").click()

        # Wait for continue modal
        self.selenium.element_wait("id", "continue_take_a_break")
        # Click Take a break
        driver.find_element_by_id("continue_take_a_break").click()
    
        # Wait for continue modal again, check for # of pomodoro = 1
        time.sleep(1)
        self.selenium.element_wait("id", "continue_cancel_button")
        pomodoro_count = driver.find_element_by_xpath("//div[div[contains(text(), '# of pomodoro completed')]]/div[2]")
        self.assertEqual(pomodoro_count.text, '1')

        # Do another pomodoro
        driver.find_element_by_id("continue_confirm_button").click()
        time.sleep(2)
        self.selenium.element_wait("id", "continue_cancel_button")

        # Go back to project tab
        driver.find_element_by_id("continue_cancel_button").click()
        time.sleep(1)
        driver.find_element_by_id("sidebar_user_Projects").click()

        # Check Sessions and Total Pomodoros incremented
        project_entry = driver.find_element_by_xpath("//tr[td[contains(text(), '{}')]]".format(self.project_name))
        self.assertEqual(project_entry.find_element_by_xpath("td[3]").text, '1')
        self.assertEqual(project_entry.find_element_by_xpath("td[4]").text, '2')


    def test_start_pomodoro_no_associate_break(self):
        driver = self.driver

        # Click on "Pomodoro" tab
        driver.find_element_by_id("sidebar_user_Pomodoro").click()
        # Click on "Create a new pomodoro" button
        driver.find_element_by_id("create_pomodoro_button").click()
        # Type in 1 second pomodoro and 1 second break
        driver.find_element_by_id("create_second").send_keys(1)
        driver.find_element_by_id("break_seconds").send_keys(1)
        # Associate with current random project name
        Select(driver.find_element_by_id("project_select_box")).select_by_visible_text('No association')
        # Confirm create pomodoro
        driver.find_element_by_id("create_confirm_button").click()

        # Wait for continue modal
        self.selenium.element_wait("id", "continue_take_a_break")
        # Click Take a break
        driver.find_element_by_id("continue_take_a_break").click()

        time.sleep(2)
        self.selenium.element_wait("id", "continue_cancel_button")

        # Go back to project tab
        driver.find_element_by_id("continue_cancel_button").click()
        time.sleep(1)
        driver.find_element_by_id("sidebar_user_Projects").click()

        # Check Sessions and Total Pomodoros didn't increment
        project_entry = driver.find_element_by_xpath("//tr[td[contains(text(), '{}')]]".format(self.project_name))
        self.assertEqual(project_entry.find_element_by_xpath("td[3]").text, '0')
        self.assertEqual(project_entry.find_element_by_xpath("td[4]").text, '0')