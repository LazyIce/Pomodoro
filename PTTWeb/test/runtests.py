import unittest
import HtmlTestRunner
from utils.config import REPORT_PATH
from suite.admin_suite import adminSuite
from suite.user_suite import userSuite

if __name__ == '__main__':
	admin_suite = adminSuite()
	user_suite = userSuite()
	suite = unittest.TestSuite((admin_suite, user_suite))
	runner = HtmlTestRunner.HTMLTestRunner(output=REPORT_PATH, report_title='use_case1_report', verbosity=2)
	runner.run(suite)