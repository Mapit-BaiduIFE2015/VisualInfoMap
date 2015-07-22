var rop = 'roll';
var lob = 'line';
var focusColor = '#4fccf1';

function changeBar(group, element)
{
    if (group == 'rop'){
        var roll = document.getElementById('roll-color-bar');
        var pie = document.getElementById('pie-color-bar');
        if (element == 'roll'){
            roll.style.background = focusColor;
            pie.style.background = 'transparent';
        }else if (element == 'pie'){
            roll.style.background = 'transparent';
            pie.style.background = focusColor;
        }else
            changeBar(group, rop);
    }else{
        var line = document.getElementById('line-color-bar');
        var bar = document.getElementById('bar-color-bar');
        if (element == 'line'){
            line.style.background = focusColor;
            bar.style.background = 'transparent';
        }else if (element == 'bar'){
            line.style.background = 'transparent';
            bar.style.background = focusColor;
        }else
            changeBar(group, lob);
    }
}

function changeChart(group, element)
{
    changeBar(group, element);
    if (group == 'rop'){
        rop = element;
        var roll = document.getElementById('roll-chart');
        var pie = document.getElementById('pie-chart');
        if (element == 'roll'){
            roll.style.display = 'block';
            pie.style.display = 'none';
        }else{
            roll.style.display = 'none';
            pie.style.display = 'block';
        }
    }else{
        lob = element;
        var line = document.getElementById('line-chart');
        var bar = document.getElementById('bar-chart');
        if (element == 'line'){
            line.style.display = 'block';
            bar.style.display = 'none';
        }else{
            line.style.display = 'none';
            bar.style.display = 'block';
        }
    }
}