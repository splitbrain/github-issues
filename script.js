$(document).ready(function() {
    $('#load').hide();
    $('#name').focus();
    $('#submit').submit(function(e) {
        $('#output').html('');
        var name = $('#name').val();
        $('#load').show();
        $.getJSON('http://github.com/api/v1/json/' + name + '?callback=?', function(json) {
            $('#load').hide();
            $.each(json.user.repositories, function(i, repo) {
                $.getJSON('http://github.com/api/v2/json/issues/list/' + name + '/' + repo.name + '/open?callback=?', function(json) {
                    if(json['issues'].length > 0) {
                        var html = '<div class="repo"><dl><dh>';
                        html += '<a href="http://github.com/' + name + '" title="' + name + '" target="_blank">' + name + '</a>';
                        html += ' / ';
                        html += '<a href="http://github.com/' + name + '/' + repo.name + '" title="' + repo.name + '" target="_blank">' 
                                + repo.name + '</a>';
                        html += '</dh>';
                        $.each(json['issues'], function(i, issue) {
                            html += '<li>' + issue.created_at + ' / ';
                            html += '<a href="http://github.com/' + name + '/' + repo.name + '/issues#issue/' + issue.number 
                                    + '" title="' + issue.number + '" target="_blank">' + issue.title + '</a>';
                            html += '</li>';
                        });
                        html += '</dl></div>';
                        $('#output').append(html);
                    }
                });
            });
        });
        return false;
    });
});
