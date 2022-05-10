class ScriptLoader {
  static loadScript(url, callback) {
    let old_script = document.getElementById(url);
    if (old_script) {
      if (old_script.ready === true) {
        
        callback();
        return;
      } else {
        document.body.removeChild(old_script);
        
      }
    }
    let script = document.createElement('script');
    script.id = url;
    script.src = url;
    script.onload = script.onreadystatechange = function () {
      if (script.ready) {
        return false;
      }
      if (!script.readyState 
        ||
        script.readyState === "loaded" || script.readyState === 'complete' 
      ) {
        // console.log("INFO:load:" + url);
        script.ready = true;
        callback();
      }
    };
    document.body.appendChild(script);
  }

  
  static syncLoadScripts(scripts, callback) {
    let ok = 0;
    let loadScript = function (url) {
      ScriptLoader.loadScript(url, function () {
        ok++;
        // console.log("init:" + url)
        if (ok === scripts.length) {
          callback();
        } else {
          loadScript(scripts[ok])
        }
      })
    }
    loadScript(scripts[0]);
  }

  static asyncLoadScripts(scripts, callback) {
    let ok = 0;
    for (let i = 0; i < scripts.length; i++) {
      ScriptLoader.loadScript(scripts[i], function () {
        console.log(scripts[ok])
        ok++;
        if (ok === scripts.length) {
          callback();
        }
      })
    }
  }
}

export default ScriptLoader;
