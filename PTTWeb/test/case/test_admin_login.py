import unittest
from utils.myselenium import MySelenium
from utils.config import Config
from utils.log import logger


class TestAdminLogin(unittest.TestCase):

    def setUp(self):
        self.selenium = MySelenium('Chrome')
        self.driver = self.selenium.driver
        self.base_url = Config().get('URL')
    
    def tearDown(self):
        self.driver.close()

    def test_admin_login_with_correct_name(self):
        driver = self.driver
        driver.get(self.base_url + "/login")

        # Find input for the admin login
        username_input = driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/div/input")

        # Check the input placeholder
        placeholder = username_input.get_attribute('placeholder')
        logger.info('find input: ' + placeholder)
        self.assertEqual(placeholder, "Enter your admin name")

        # type "admin" into username_input
        username_input.send_keys("admin")
        logger.info('type into input: ' + username_input.get_attribute("value"))
        
        # find submit button
        submit_button = driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/button")
        logger.info('find button: ' + submit_button.text)

        # click "submit" button
        submit_button.click()
        logger.info('click button')

        # Check url is "/dashboard" and username is "admin"
        curURL = driver.current_url
        logger.info('curURL is: ' + curURL)
        self.assertEqual(curURL, self.base_url+"/dashboard")
        name = driver.find_element("id", "username").text
        logger.info('current username is' + name)
        self.assertEquals(name, "admin")

    
    def test_admin_login_with_wrong_name(self):
        driver = self.driver
        driver.get(self.base_url + "/login")

        # Find input for the admin login
        username_input = driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/div/input")
        logger.info('find input: ' + username_input.get_attribute('name'))

        # type "admin1" into username_input
        username_input.send_keys("admin1")
        logger.info('type into input: ' + username_input.get_attribute("value"))

        # find submit button
        submit_button = driver.find_element("xpath", "//div[@id='login-tabpane-admin']/form/button")
        logger.info('find button: ' + submit_button.text)

        # click "submit" button
        submit_button.click()
        logger.info('click button')

        # Find alert is "Enter 'admin' as the username"
        curURL = driver.current_url
        logger.info('curURL is: ' + curURL)
        self.assertEqual(curURL, self.base_url+"/login")
        alert = driver.find_element("xpath", "//div[@role='alert']")
        logger.info('check alert is: ' + alert.text)
        self.assertEqual(alert.text, "Admin name is wrong!")
