<?php
ini_set('display_errors',1);
abstract class Arma{

    public $danyo;

    public function __construct($danyo){
        $this->danyo = $danyo;
    }

    public abstract function inflige_danyo();
}

class Espada extends Arma{
    public function inflige_danyo(){
        return $this->danyo;
    }
}

class Hacha extends Arma{
    public function inflige_danyo(){
        return $this->danyo;
    }
}

class ArcoLargo extends Arma{
    public function inflige_danyo(){
        return $this->danyo;
    }
}

?>