/**
 * @file
 * This file contains the JavaScript implementation for the DrupalGap module.
 */
(function ($) {
  Drupal.behaviors.drupalgap = {
    attach: function (context, settings) {
      try {
        // Make a test service resource call to system connect and inform the user of the results.
        $('#drupalgap-system-connect-status-message').html("<img src='" + Drupal.settings.basePath  + "misc/throbber.gif' />");
        $.ajax({
            url: Drupal.settings.drupalgap.services_endpoint_default + 'system/connect.json',
            type: "post",
            dataType: "json",
            error: function (jqXHR, textStatus, errorThrown) {
              if (!errorThrown) {
                errorThrown = 'The "System Connect" test failed!';
              }
              var html = '<div class="messages error">' + errorThrown + '</div>';
              html += '<div class="messages warning"><a href="http://drupal.org/node/1603690" target="_blank">View DrupalGap Troubleshooting Topics</a></div>';
              $('#drupalgap-system-connect-status-message').html(html);
            },
            success: function (data) {
              msg = Drupal.t("The system connect test was successful, <strong>DrupalGap is configured properly!</strong>");
              $('#drupalgap-system-connect-status-message').html("<div class='messages status'>" + msg + "</div>");
            }
        });
      }
      catch (error) {
        alert(Drupal.t(error));
      }
    }
  };
}(jQuery));
