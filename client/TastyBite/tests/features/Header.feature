# Header.feature
Feature: Header
  Scenario: User is not logged in
    Given the user is not logged in
    When the user views the header
    Then the login and register links should be displayed

  Scenario: User is logged in
    Given the user is logged in
    When the user views the header
    Then the profile icon and name should be displayed