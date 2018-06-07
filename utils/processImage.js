const path = require('path')
var currentpath = path.join(__dirname)
const cv = require('opencv');

module.exports = async (ctx, next) => {
    var imgPath = ctx.request.body.imgPath
    var image = cv.VideoCapture(imgPath)
    cv.readImage("/root/Projects/DieTuServer/UserFolder/mona.png", function(err, im){
      im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
        if (err) {
            console.log("error in face detect.")
        }
        for (var i=0;i<faces.length; i++){
          var x = faces[i]
          im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
        }
        im.save('/root/Projects/DieTuServer/UserFolder/out.jpg');
      });
    })
    const data = '{"url": "https://fever.fun/UserFolder/out.jpg"}'
    ctx.state.data = data
}
