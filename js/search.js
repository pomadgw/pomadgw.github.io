var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")).replace(/(<([^>]+?)>)/ig,"");
}

function display_search_results(results, q) {
  var $search_results = $("#search_results");
  if (!q) {
    document.title = "Search";
    return;
  }
  document.title = "Search results for \"" + q + "\"";
  $("#search_box").val(q);
  $("#search-header").text('Search result for "' + q + '"');
  // Wait for data to loaddocument.title
  window.data.then(function(loaded_data) {
    // Are there any results?
    if (results.length) {
      $search_results.empty(); // Clear any old results
      // Iterate over the results
      // ii = 1;
      results.forEach(function(result) {
        var item = loaded_data[result.ref];
        $text = $('<li>');
        $link = $('<a>', {href: item.url});
        $link.text(item.title);
        $text.append($link);

        // Build a snippet of HTML for this result
        // var appendString = '<li><a href="' + item.url + '">' + item.title + '</a></li>';

        // Add it to the results
        $search_results.append($text);
      });
    } else {
      $search_results.html('<li>No results found</li>');
    }
  });
}

$(document).ready(function() {
  // Initalize lunr with the fields it will be searching on. I've given title
  // a boost of 10 to indicate matches on this field are more important.
  window.idx = lunr(function () {
    this.field('id');
    this.field('title', { boost: 10 });
    this.field('text');
    this.field('categories');
  });

  // Download the data from the JSON file we generated
  window.data = $.getJSON('/search_data.json');

  // Wait for the data to load and add it to lunr
  window.data.then(function(loaded_data){
    $.each(loaded_data, function(index, value){
      window.idx.add(
        $.extend({ "id": index }, value)
      );
    });

    var query = getParameterByName('q');
    var results = window.idx.search(query); // Get lunr to perform a search
    display_search_results(results, query); // Hand the results off to be displayed
  });
});
