import { Pipe, PipeTransform} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({name: 'Linkify'})
    export class LinkifyPipe implements PipeTransform {
      constructor(private sanitize : DomSanitizer){}
      transform(link: string) {
        return this.linkify(link);
      }
      private linkify(plainText : string){
        let replacedText = "";
        
        replacedText = plainText.replace(/<.*?>/, "");

        replacedText = replacedText.replace(/#+([A-Za-z0-9-_]+)/gi, ' <a id="tag-span" class="post-link" href="/search/$1">#$1</a>');

        replacedText = replacedText.replace(/@+([A-Za-z0-9-_]+)/gi, ' <a id="tag-span" class="post-link" href="/profile/$1">@$1</a>');

        return this.sanitize.bypassSecurityTrustHtml(replacedText);
       }
    }