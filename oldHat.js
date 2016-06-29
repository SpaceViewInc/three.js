function makeUndo(action, obj, name){
    if(skipUndo){
        return;
    }
    var originalObj = {
        scale: obj.scale.clone(),
        position: obj.position.clone(),
        rotation: obj.rotation.clone()
    };

    editor.history.add(function(){
        if(typeof action !== "function"){
            throw new TypeError("undo action must be a function")
        }
        action(obj, originalObj);
        signals.objectChanged.dispatch( obj );
    }, function(){
        applyMatrixAttributeToObjectByName(obj, name, true);
        signals.objectChanged.dispatch( obj );
    });
}

obj.updateMatrix();
var position = new THREE.Vector3();
var quaternion = new THREE.Quaternion();
var scale = new THREE.Vector3();

// scale * point_translation * rotation * object_translation

// MUTABILITYYYYYYY
obj.matrix.decompose(position, quaternion, scale);

var matrixToApply = new THREE.Matrix4();
//obj.matrix.clone();

switch(name){
    case "scale":
        matrixToApply.scale(scale);
        obj.geometry.applyMatrix( obj.matrix );
        makeUndo(
            function(obj, originalObj) {
                obj.scale.divide(originalObj.scale);
                applyMatrixAttributeToObjectByName(obj, name, true);
                obj.scale.multiply(originalObj.scale);
            },
            obj,
            name
        );
        obj.scale.set( 1, 1, 1 );
    break;

    case "rotation":
    matrixToApply.makeRotationFromQuaternion( quaternion );
    obj.geometry.applyMatrix( obj.matrix );
    makeUndo(
        function(obj, originalObj) {
            var vectorRotationSubtraction = obj.rotation.toVector3().add(originalObj.rotation.toVector3());
            obj.rotation.setFromVector3(vectorRotationSubtraction);
        },
        obj,
        name
    )
    obj.rotation.set( 0, 0, 0 );
    break;

    case "position":
    matrixToApply.setPosition( position );
    obj.geometry.applyMatrix( matrixToApply );
    obj.updateMatrix();
    makeUndo(
        function(obj, originalObj) {
            obj.position.sub(originalObj.position)
            applyMatrixAttributeToObjectByName(obj, name, true);
            obj.position.add(originalObj.position);
        },
        obj,
        name
    )
    obj.position.set( 0, 0, 0 );
    break;
}

obj.updateMatrix();
