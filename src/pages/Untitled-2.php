<?php
require("../includes/connect.php");
$query = $con->query("SELECT * FROM cycles WHERE `grandchild2` !='x' && `grandchild4` !='x' && `status` = 'Pending'");
$count = $query->num_rows;


if($count > 0) {


    while($row = $query->fetch_array()) {

        $id = $row['id'];
        $referral = $row['referrer'];
        $child1 = $row['child1'];
        $child2 = $row['child2'];
        $grandchild1 = $row['grandchild1'];
        $grandchild2 = $row['grandchild2'];
        $grandchild3 = $row['grandchild3'];
        $grandchild4 = $row['grandchild4'];

        $_grandchild1 = "_".$grandchild1."_";
        $_grandchild2 = "_".$grandchild1."_";
        $_grandchild3 = "_".$grandchild1."_";
        $_grandchild4 = "_".$grandchild1."_";

         //referrer's email
         $referralArray = $con->query("SELECT * FROM users WHERE `username` = '{$referral}'")->fetch_array();
         $referralEmail = $referralArray['email'];

        //add referrer to new row
        $newRow = $con->query("INSERT INTO cycles (`referrer`,`status`) VALUES ('{$referral}', 'Pending')");

        if($newRow ==1){

                //update current row's status
                $statusUpdate = $con->query("UPDATE cycles SET `status` = 'Completed' WHERE `id` = '{$id}'");
                // $grandchildrenUpdate = $con->query("UPDATE cycles SET (`grandchild1`,`grandchild2`,`grandchild3`,`grandchild4`) VALUES('{$_grandchild1}','{$_grandchild2}','{$_grandchild3}','{$_grandchild4}') WHERE `id` = '{$id}'");

                //add cash and airtime to referral
                $cashArray = mysqli_fetch_array(mysqli_query($con,"SELECT * FROM cash WHERE `email` = '{$referralEmail}'"));
                $airtimeArray = mysqli_fetch_array(mysqli_query($con,"SELECT * FROM airtime WHERE `email` = '{$referralEmail}'"));
                $cashLeft = $cashArray['balance'];
                $airtimeLeft = $airtimeArray['balance'];

                $newCashBalance = $cashLeft+ 4050;
                $newAirtimeBalance = $airtimeLeft + 450;

                $updateCash = $con->query("UPDATE cash SET `balance` = '{$newCashBalance}' WHERE `email` = '{$referralEmail}'");
                $updateAirtime = $con->query("UPDATE airtime SET `balance` = '{$newAirtimeBalance}' WHERE `email` = '{$referralEmail}'");
                $messageQuery = mysqli_query($con,"INSERT INTO msg (`username`,`message`,`type`) VALUES('{$referral}','Congratulations!! You have completed one cycle and earned Ksh 4000 cash and Ksh 450 airtime!','You have Earned Cash and Airtime')");

                    }


        //transfering grandchildren to children

        //child 1
        $child1Query = $con->query("SELECT * FROM cycles WHERE `referrer` = '{$child1}' AND (`child1` = 'x' OR `child2` = 'x'
        OR `grandchild1` = 'x' OR `grandchild2` = 'x' OR `grandchild3` = 'x' OR `grandchild4` = 'x'
        )");

        $child1Row = $child1Query->num_rows;

        if($child1Row > 0) {

            $child1Array = $child1Query->fetch_array();
            $child1Id = $child1Array['id'];
            $c1 = $child1Array['child1'];
            $c2 = $child1Array['child2'];
            $gc1 = $child1Array['grandchild1'];
            $gc2 = $child1Array['grandchild2'];
            $gc3 = $child1Array['grandchild3'];
            $gc4 = $child1Array['grandchild4'];


            //Transfer gc1 && gc2 to child 1;
            if($c1 == 'x'){
                $cycleUpdate = $con->query("UPDATE cycles SET `child1` = '{$grandchild1}' WHERE `id` = $child1Id");
            }

            else if($c2 == 'x'){
                $cycleUpdate = $con->query("UPDATE cycles SET `child2` = '{$grandchild1}' WHERE `id` = $child1Id");
            }

            else if($gc1 == 'x') {
                $cycleUpdate = $con->query("UPDATE cycles SET `grandchild1` = '{$grandchild1}' WHERE `id` = $child1Id");
            }

            else if($gc2 == 'x') {
                $cycleUpdate = $con->query("UPDATE cycles SET `grandchild2` = '{$grandchild1}' WHERE `id` = $child1Id");
            }

            else if($gc3 == 'x') {
                $cycleUpdate = $con->query("UPDATE cycles SET `grandchild3` = '{$grandchild1}' WHERE `id` = $child1Id");
            }

            else if($gc4 == 'x') {
                $cycleUpdate = $con->query("UPDATE cycles SET `grandchild4` = '{$grandchild1}' WHERE `id` = $child1Id");
            }


            //grandchild2
            if($c1 == 'x'){
                $cycleUpdateB = $con->query("UPDATE cycles SET `child1` = '{$grandchild2}' WHERE `id` = $child1Id");
            }

            else if($c2 == 'x'){
                $cycleUpdateB = $con->query("UPDATE cycles SET `child2` = '{$grandchild2}' WHERE `id` = $child1Id");
            }

            else if($gc1 == 'x') {
                $cycleUpdateB = $con->query("UPDATE cycles SET `grandchild1` = '{$grandchild2}' WHERE `id` = $child1Id");
            }

            else if($gc2 == 'x') {
                $cycleUpdateB = $con->query("UPDATE cycles SET `grandchild2` = '{$grandchild2}' WHERE `id` = $child1Id");
            }

            else if($gc3 == 'x') {
                $cycleUpdateB = $con->query("UPDATE cycles SET `grandchild3` = '{$grandchild2}' WHERE `id` = $child1Id");
            }

            else if($gc4 == 'x') {
                $cycleUpdateB = $con->query("UPDATE cycles SET `grandchild4` = '{$grandchild2}' WHERE `id` = $child1Id");
            }


            if($cycleUpdate == 1) {
                //update referral
                $referralUpdate = $con->query("UPDATE users SET `referral` = '{$child1}' WHERE `username` = '{$grandchild1}'");
                $grandChildUpdate = $con->query("UPDATE cycles SET `grandchild1` = '{$_grandchild1}' WHERE `id` = '{$id}'");

                if($referralUpdate ==1) {

                    $messageQuery = mysqli_query($con,"INSERT INTO msg (`username`,`message`,`type`) VALUES('{$child1}','$grandchild1 has been added to your current cycle.','You have a new member in your current cycle')");

                }
            }

            if($cycleUpdateB == 1) {
                //update referral
                $referralUpdate = $con->query("UPDATE users SET `referral` = '{$child1}' WHERE `username` = '{$grandchild2}'");
                $grandChildUpdate = $con->query("UPDATE cycles SET `grandchild2` = '{$_grandchild2}' WHERE `id` = '{$id}'");

                if($referralUpdate ==1) {

                    $messageQuery = mysqli_query($con,"INSERT INTO msg (`username`,`message`,`type`) VALUES('{$child1}','$grandchild2 has been added to your current cycle.','You have a new member in your current cycle')");

                }
            }

        }


         //child 2
         $child2Query = $con->query("SELECT * FROM cycles WHERE `referrer` = '{$child2}' AND (`child1` = 'x' OR `child2` = 'x'
         OR `grandchild1` = 'x' OR `grandchild2` = 'x' OR `grandchild3` = 'x' OR `grandchild4` = 'x'
         )");

         $child2Row = $child2Query->num_rows;

         if($child2Row > 0) {

             $child2Array = $child2Query->fetch_array();
             $child2Id = $child2Array['id'];
             $ch1 = $child2Array['child1'];
             $ch2 = $child2Array['child2'];
             $gch1 = $child2Array['grandchild1'];
             $gch2 = $child2Array['grandchild2'];
             $gch3 = $child2Array['grandchild3'];
             $gch4 = $child2Array['grandchild4'];


             //Transfer gc3 && gc4 to child 2;
             // gc3
             if($ch1 == 'x'){
                 $cycleUpdate2 = $con->query("UPDATE cycles SET `child1` = '{$grandchild3}' WHERE `id` = $child2Id");
             }

             else if($ch2 == 'x'){
                 $cycleUpdate2 = $con->query("UPDATE cycles SET `child2` = '{$grandchild3}' WHERE `id` = $child2Id");
             }

             else if($gch1 == 'x') {
                 $cycleUpdate2 = $con->query("UPDATE cycles SET `grandchild1` = '{$grandchild3}' WHERE `id` = $child2Id");
             }

             else if($gch2 == 'x') {
                 $cycleUpdate2 = $con->query("UPDATE cycles SET `grandchild2` = '{$grandchild3}' WHERE `id` = $child2Id");
             }

             else if($gch3 == 'x') {
                 $cycleUpdate2 = $con->query("UPDATE cycles SET `grandchild3` = '{$grandchild3}' WHERE `id` = $child2Id");
             }

             else if($gc4 == 'x') {
                 $cycleUpdate2 = $con->query("UPDATE cycles SET `grandchild4` = '{$grandchild3}' WHERE `id` = $child2Id");
             }

             //gc4
             if($ch1 == 'x'){
                 $cycleUpdate2B = $con->query("UPDATE cycles SET `child1` = '{$grandchild4}' WHERE `id` = $child2Id");
             }

             else if($ch2 == 'x'){
                 $cycleUpdate2B = $con->query("UPDATE cycles SET `child2` = '{$grandchild4}' WHERE `id` = $child2Id");
             }

             else if($gch1 == 'x') {
                 $cycleUpdate2B = $con->query("UPDATE cycles SET `grandchild1` = '{$grandchild4}' WHERE `id` = $child2Id");
             }

             else if($gch2 == 'x') {
                 $cycleUpdate2B = $con->query("UPDATE cycles SET `grandchild2` = '{$grandchild4}' WHERE `id` = $child2Id");
             }

             else if($gch3 == 'x') {
                 $cycleUpdate2B = $con->query("UPDATE cycles SET `grandchild3` = '{$grandchild4}' WHERE `id` = $child2Id");
             }

             else if($gc4 == 'x') {
                 $cycleUpdate2B = $con->query("UPDATE cycles SET `grandchild4` = '{$grandchild4}' WHERE `id` = $child2Id");
             }


             if($cycleUpdate2 == 1) {
                 //update referral
                 $referralUpdate = $con->query("UPDATE users SET `referral` = '{$child2}' WHERE `username` = '{$grandchild3}'");
                 $grandChildUpdate = $con->query("UPDATE cycles SET `grandchild3` = '{$_grandchild3}' WHERE `id` = '{$id}'");

                 if($referralUpdate ==1) {

                     $messageQuery = mysqli_query($con,"INSERT INTO msg (`username`,`message`,`type`) VALUES('{$child2}','$grandchild3 has been added to your current cycle.','You have a new member in your current cycle')");

                 }
             }


             if($cycleUpdate2B == 1) {
                 //update referral
                 $referralUpdate = $con->query("UPDATE users SET `referral` = '{$child2}' WHERE `username` = '{$grandchild4}'");
                 $grandChildUpdate = $con->query("UPDATE cycles SET `grandchild4` = '{$_grandchild4}' WHERE `id` = '{$id}'");

                 if($referralUpdate ==1) {

                     $messageQuery = mysqli_query($con,"INSERT INTO msg (`username`,`message`,`type`) VALUES('{$child2}','$grandchild4 has been added to your current cycle.','You have a new member in your current cycle')");

                 }
             }



        }


    }

}

?>
