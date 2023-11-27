# postImage.feature

Feature: Post an Image

  Scenario: Successfully add an image
    Given the request body with title "Test Image"
    And a file with image data and MIME type "image/jpeg"
    When the postImage function is called
    Then it should respond with status 201
    And the response should contain the image with title "Test Image"

  Scenario: Handle errors when adding an image
    Given the request body with title "Test Image"
    And a file with image data and MIME type "image/jpeg"
    And the Image model save method throws an error
    When the postImage function is called
    Then it should respond with status 500
    And the response should contain an error message
