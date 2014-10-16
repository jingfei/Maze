<!DOCTYPE html>
<html>
	<head>
		<script src="script.js"></script>
	</head>
	<body style="text-align:center">
	<canvas id="myCanvas" width="500" height="500" style="border:1px solid #d3d3d3;"></canvas>
<script>
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.beginPath();
var $Size=5;
var $Big=100;
var $ar=new Array($Size*2+1);
var $Visited=new Array($Size*2+1);
var $step = [];


<?php 
	$Size=5;
	$Big=100;
	/* decide and read Maze */
	$Rand=rand(1,5);
	$File="Maze".(string)$Rand.".txt";
	$Maze=fopen($File,"r");
	$ar=array();
	for($i=0; $i<$Size*2+1; ++$i){
		$ar[$i]=fgets($Maze);
		echo '$ar['.$i.']=new Array($Size*2+1);';
		echo '$Visited['.$i.']=new Array($Size*2+1);';
		for($j=0; $j<$Size*2+1; ++$j){
			echo '$ar['.$i.']['.$j.']='.$ar[$i][$j].';';
			echo '$Visited['.$i.']['.$j.']=false;';
		}
	}
	fclose($Maze);
	/*************************/
?>
	for(var $i=0; $i<$Size*2+1; $i++)
		for(var $j=0; $j<$Size*2+1; $j++){
			var $I=Math.floor($i/2);
			var $J=Math.floor($j/2);
			if($i%2==0){
				if($j%2==1 && $ar[$i][$j]==0){
					ctx.moveTo($J*$Big,$I*$Big);
					ctx.lineTo(($J+1)*$Big,$I*$Big);
				}
			}
			else{
				if($j%2==0 && $ar[$i][$j]==0){
					ctx.moveTo($J*$Big,$I*$Big);
					ctx.lineTo($J*$Big,($I+1)*$Big);
				}
			}
		}
	ctx.stroke();
	ctx.save();
	Go();

</script>
	</body>
</html>
