function Circle($y,$x,$Color){
	ctx.beginPath();
	if($Color=="#0000ff") ctx.arc($x,$y,10,0,2*Math.PI);
	else{
		ctx.arc($x,$y,10,0,2*Math.PI);
		ctx.arc($x,$y,10,0,2*Math.PI);
	}
	ctx.strokeStyle=$Color;
	ctx.stroke();
}

function Draw($Fix,$i,$Begin,$End,$color,$j,Len){
	if($Begin==$End){
		setTimeout(function(){Recursive($j+1,Len);},5); 
		return;
	}
	if($Fix){
		Circle($i,$Begin,$color);
	}
	else{
		Circle($Begin,$i,$color);
	}
	if($Begin<$End)
		setTimeout(function(){Draw($Fix,$i,$Begin+1,$End,$color,$j,Len);},5);
	else
		setTimeout(function(){Draw($Fix,$i,$Begin-1,$End,$color,$j,Len);},5);
}

function Recursive($j,Len){
	if($j>=Len) return;
	$y1=$step[$j].PreY;
	$y2=$step[$j].y;
	$x1=$step[$j].PreX;
	$x2=$step[$j].x;
	$color=$step[$j].color;
	if($y1==$y2){
		setTimeout(function(){Draw(true,$y1,$x1,$x2,$color,$j,Len);},5);
	}
	else{
		setTimeout(function(){Draw(false,$x1,$y1,$y2,$color,$j,Len);},5);
	}
}

function Walk(){
	var Len=$step.length;
	Recursive(0,Len);
}

function Check($y,$x){
	if($y<0 || $x<0 || $y>=$Size*2+1 || $x>=$Size*2+1) return false;
	return true;
}
function Dfs($prey,$prex,$y,$x){
	$Final=false;
	if($y==10 && $x==5){ 
		$step.push({
			PreY: 450,
			PreX: 250,
			y: 550,
			x: 250,
			color: "#0000ff"
		});
		Walk(); 
		return true;
	}
	$Visited[$y][$x]=true;
	$PreY=Math.floor($prey/2)*$Big+50;
	$PreX=Math.floor($prex/2)*$Big+50;
	$Y=Math.floor($y/2)*$Big+50;
	$X=Math.floor($x/2)*$Big+50;
	$step.push({
		PreY: $PreY,
		PreX: $PreX,
		y: $Y,
		x: $X,
		color: "#0000ff"
	});
	if(!$Visited[$y+1][$x] && Check($y+1,$x) && $ar[$y+1][$x]==1){
		if(Dfs($y,$x,$y+1,$x))
			$Final=true;
	}
	if(!$Visited[$y-1][$x] && Check($y-1,$x) && $ar[$y-1][$x]==1){
		if(Dfs($y,$x,$y-1,$x)) 
			$Final=true;
	}
	if(!$Visited[$y][$x+1] && Check($y,$x+1) && $ar[$y][$x+1]==1){
		if(Dfs($y,$x,$y,$x+1))
			$Final=true;
	}
	if(!$Visited[$y][$x-1] && Check($y,$x-1) && $ar[$y][$x-1]==1){
		if(Dfs($y,$x,$y,$x-1))
			$Final=true;
	}
	if(!$Final){
		$PreY=Math.floor($prey/2)*$Big+50;
		$PreX=Math.floor($prex/2)*$Big+50;
		$Y=Math.floor($y/2)*$Big+50;
		$X=Math.floor($x/2)*$Big+50;
		$step.push({
			y: $PreY,
			x: $PreX,
			PreY: $Y,
			PreX: $X,
			color: '#ff0000'
		});
	}
	return $Final;
}

function Go(){
	$Visited[0][5]=true;
	Dfs(-1,5,1,5);
}
