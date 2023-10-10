<?php

    function validate ($x, $y, $R) {
        if (is_numeric($x) && is_numeric($y) && is_numeric($R) && (-4 <= $x && $x <= 4 && -3 <= $y && $y <= 5 && 1 <= $R && $R <= 5)) {
            return true;
        }
        return false;
    }

    function checkDot ($x, $y, $R) {
        if ($x < $R && $x > 0 && $y > 0 && $y < 0.5*$R && $y >= 2 / $R * abs($x)) {
            return true;
        }
        if ($x < $R and $x > 0 and $y < 0 and $y > -0.5 * $R) {
            return true;
        }
        $dist  = sqrt($x**2 + $y**2);
        if($dist < $R and $x<0 and $y<0){
            return true;
        }
        return false;
    }
?>