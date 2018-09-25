<?php
ini_set('display_errors',1);

interface Armadura{
    public function absorve_danyo($danyo);
}

class ArmaduradeBronze implements Armadura{
    public function absorve_danyo($danyo){
        return $danyo / 2;
    }
}

class ArmaduradePlata implements Armadura{
    public function absorve_danyo($danyo){
        return $danyo / 3;
    }
}

class ArmaduradeMalla implements Armadura{
    public function absorve_danyo($danyo){
        if (rand(0,1)) {
            $danyo = 0;
            echo "<p>Pero este logró esquivar el ataque</p>";
        }
        return $danyo;
    }
}

?>