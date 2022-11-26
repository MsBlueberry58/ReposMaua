;;;;;;;;;; Namespace e imports ;;;;;;;;;;
(ns clojure-mysql.core
  (:require
   [io.pedestal.http :as http]
   [io.pedestal.http.route :as route]))

;;;;;;;;;; Globais ;;;;;;;;;;
(def host "localhost")
(def port 8899)

;;;;;;;;;; Handlers das rotas ;;;;;;;;;;
(defn index-handler [request]
  {:status 200
   :body {:host host
          :port port}})

(defn create-handler [request]
  {:status 200
   :body {}})

(defn read-handler [request]
  {:status 200
   :body {}})

(defn update-handler [request]
  {:status 200
   :body {}})

(defn delete-handler [request]
  {:status 200
   :body {}})

;;;;;;;;;; Setup API e servidor ;;;;;;;;;;
(def routes
  (route/expand-routes
   #{["/index" :get index-handler :route-name :index]
   ["/create" :get create-handler :route-name :create]
   ["/read" :get read-handler :route-name :read]
   ["/update" :get update-handler :route-name :update]
   ["/delete" :get delete-handler :route-name :delete]}))


(defn create-server []
  (http/create-server
   {::http/routes routes
    ::http/type :jetty
    ::http/port port}))

(defn start []
  (http/start (create-server)))