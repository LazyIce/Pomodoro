import unittest
import HtmlTestRunner
from case.test_user_add_project import TestUserAddProject

def pomodoroSuite():
    suite = unittest.TestSuite()
    
    tests = [
        TestUserAddProject("test_user_add_project_with_exist_name"),
    ]
    suite.addTests(tests)

    return suite