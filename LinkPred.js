userList = []
userMatrix = []

function degree(vertex, matrix){
  sum = 0
  for (var i = 0; i < matrix[vertex].length; i++) {
    sum += matrix[vertex][i]
  }
  return sum
}

function inter(v1, v2, matrix){
  r1 = matrix[v1]
  r2 = matrix[v2]
  result = []
  for (var i = 0; i < r1.length; i++) {
    result.push(r1[i] * r2[i])
  }
  return result
}

function adamicAdar(v1, v2, matrix){
  som = 0
  dum = inter(v1,v2,matrix)
  for (var i = 0; i < dum.length; i++) {
    if(dum[i] == 1){
      item = 1/(Math.log10(degree(i,matrix)))
      som += item
    }
  }

  return som
}

function compareScore(a,b) {
  if (a.score < b.score)
     return 1;
  if (a.score > b.score)
    return -1;
  return 0;
}

function recommend(username){
  pos = -1
  for (var i = 0; i < userList.length; i++) {
    if (userList[i] == username) {
      pos = i
      break
    }
  }

  //tratar pos = -1 depois !!!!

  valores = []

  for (var i = 0; i < userList.length; i++) {
    if (pos != i) {
      if(userMatrix[pos][i] != 1) {
        valor = adamicAdar(pos, i, userMatrix)
        var score = {user:userList[i], score:valor};
        valores.push(score)
      }
    }

  }

  valores = valores.sort(compareScore)

  return (valores.slice(0,5))

}

/*
 daq p baixo é pagerank, boy
*/

function matrixbyscalar(matrix, scalar){
  dot = []
  for(var i=0;i<matrix.length;i++){
      temp = []
      for(var j=0;j<matrix[i].length;j++){
          temp.push(matrix[i][j]*scalar);
      }
      dot.push(temp)
  }
  return dot;
}

function addmatrices(m1, m2){
  result = [];
  for(var i=0;i<m1.length;i++){
      temp = []
      for(var j=0;j<m1[0].length;j++){
          temp.push(m1[i][j] + m2[i][j]);
      }
      result.push(temp)
  }

  return result;
}

function multiplymatrices(m1, m2) {
  var result = [];
  for (var i = 0; i < m1.length; i++) {
      result[i] = [];
      for (var j = 0; j < m2[0].length; j++) {
          var sum = 0;
          for (var k = 0; k < m1[0].length; k++) {
              sum += m1[i][k] * m2[k][j];
          }
          result[i][j] = sum;
      }
  }
  return result;
}

function pagerank(matrix, alpha, iterations){
  rw = []
  for(var i=0;i<matrix.length;i++){
      temp = []
      for(var j=0;j<matrix[i].length;j++){
          temp.push(matrix[i][j]/(matrix[i].reduce(function(acc,val){
              return acc+val;
          })));
      }
      rw.push(temp)
  }
  
  tele = []
  for(var i=0;i<matrix.length;i++){
      temp = []
      for(var j=0;j<matrix[i].length;j++){
          temp.push(1/(matrix[i].length));
      }
      tele.push(temp)
  }

  P = addmatrices(matrixbyscalar(rw, alpha), matrixbyscalar(tele,1-alpha))
  for(var i=0;i<iterations;i++){
      P = multiplymatrices(P, P)
  }
      
  return P;
}


//meu pc por algum motivo doido so abre arquivo se for por link, nao abre arquivo local
d3.csv("cluster2frame.csv", function(csv) {
  console.log(csv);
  data = csv
  for (var i = 0; i < data.length; i++) {

    flag = 0
    flag2 = 0
    for (var j = 0; j < userList.length; j++) {
      if (data[i]['Source'] == userList[j]) { flag = 1 }
      if (data[i]['Target'] == userList[j]) { flag2 = 1 }
    }

    if (flag==0) { userList.push(data[i]['Source']) }
    if (flag2==0) { userList.push(data[i]['Target']) }

  }

  for (var i = 0; i < userList.length; i++) {

    userFollowing = []
    userFollowing.length = userList.length;
    userFollowing.fill(0)

    for (var j = 0; j < userList.length; j++) {
      for (var k = 0; k < data.length; k++) {
        if (userList[i] == data[k]["Source"]){
          if (userList[j] == data[k]["Target"]){
            userFollowing[j] = 1
          }
        }
      }
    }
    userMatrix.push(userFollowing)
  }


});
