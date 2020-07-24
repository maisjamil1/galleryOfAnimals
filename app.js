'use strict';
// function getData(pNO){
//  $.getJSON( `page-${pNO}.json`, function(data) {
//   console.log(data);
// })}
// getData(1)


//_________________________________________________
function Animals(obj) {
  this.title = obj.title
  this.img = obj.image_url
  this.keyword = obj.keyword
  this.horns = obj.horns
  this.description = obj.description

  animalsss.push(this)
}

var animalsss = []
// console.log(animalsss);

//_________________________________________________
Animals.prototype.render = function () {
  let $clone = $('#hi').clone()
  // console.log($clone)
  $clone.find('h2').text(this.title)
  $clone.find('p').text(this.description)
  $clone.find('img').attr('src', this.img)
  $clone.removeAttr('id')
  $clone.attr('class', this.keyword)
  $('div').append($clone)

}

//_________________________________________________
var keey = []

function selectt() {
  $('select').empty()
  let keey = []
  animalsss.forEach(val => {
    if (!keey.includes(val.keyword)) {
      keey.push(val.keyword)
    }

  })

  keey.forEach(ele => {
    let $opt = $('<option></option>').text(ele)
    $opt.attr('value', ele)
    $('select').append($opt)
  })
}

//_________________________________________________


//_________________________________________________
function renderpage() {
  $('#bt1').on('click', function () {
    animalsss = []
    jj(1)
  })

  $('#bt2').on('click', function () {
    animalsss = []
    jj(2)
  })
}
renderpage()

function renderGroup() {
  $('select').on('change', () => {
    let $chosen = $('select').val()
    $('section').hide();
    $(`.${$chosen}`).show()
  })
 
}
renderGroup()
//_________________________________________________
$('#radioTitle').on('click', () => {
  $('div').html('')
  sortA(animalsss, 'title');

})

$('#radiohorns').on('click', () => {
  $('div').html('')
  sortA(animalsss, 'horns');

})

//_________________________________________________

function sortA(arrr, sortBy) {
  // console.log(sortBy)
  animalsss.sort((a, b) => {
    let ele1 = a[sortBy]
    let ele2 = b[sortBy]
    if (sortBy === 'title') {
      ele1 = ele1.toLowerCase()
      ele2 = ele2.toLowerCase()
    }
    if (ele1 > ele2) {
      return 1
    }
    else if (ele1 < ele2) {
      return -1
    } else {
      return 0
    }
  })
  animalsss.forEach(ele => {
    ele.render()
  })


}


function jj(p) {
  $('div').html('')
  $.ajax({
    url: `page-${p}.json`, success: function (result) {
      let Arr;
      result.forEach(obj => {
        Arr = new Animals(obj)
        Arr.render()
      })
      selectt()
      
    }
  });

}

jj(1)