provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
    config_context = "docker-desktop"
  }
}

provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "docker-desktop"
}

resource "helm_release" "nginx_ingress" {
  name       = "nginx-ingress-controller"
  chart      = "ingress-nginx/ingress-nginx"
}


#TODO Add cert issuer
resource "helm_release" "lets_encript_ssl_issuer" {
  name      = "lets-encrypt-ssl-issuer"
  chart      = "./charts/ssl-setup"
}

variable "keys_js" {
    type = string
}

variable "braintree_js" {
    type = string
}

variable "mailer_json" {
    type = string
}

variable "env" {
    type = string
}

variable "dotenv" {
    type = string
}

resource "kubernetes_config_map" "dotenv" {
  metadata {
    name = "${var.env}-dotenv"
  }

  data = {
    ".env" = "${var.dotenv}"
  }
}

resource "kubernetes_secret" "config" {
  metadata {
    name = "${var.env}-habits-config"
  }

  data = {
    "keys.js" = "${var.keys_js}"
    "braintree.js" = "${var.braintree_js}"
    "mailer.json" = "${var.mailer_json}"
  }

  type = "Opaque"
}