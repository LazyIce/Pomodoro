import unittest
import HtmlTestRunner
from utils.config import REPORT_PATH
from case.test_user_log_in import TestUserLogin
from case.test_user_add_project import TestUserAddProject


def runSuite2():
    suite = unittest.TestSuite()

    tests = [
        TestUserLogin('test_admin_login_with_existing_user'), 
        TestUserLogin('test_admin_login_with_non_existing_user')
        # TestUserAddProject("test_user_add_new_project_with_non_exist_name"),
        # TestUserAddProject("test_user_add_project_with_exist_name")
    ]
    suite.addTests(tests)

    runner = HtmlTestRunner.HTMLTestRunner(output=REPORT_PATH, report_title='use_case1_report', verbosity=2)
    runner.run(suite)